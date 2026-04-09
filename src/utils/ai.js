/**
 * 周公宝 — AI 解梦核心
 * 调用腾讯云 CloudBase 云函数
 */

const CLOUDBASE_CONFIG = {
  // CloudBase 环境 ID
  envId: 'sunshine20cn-ai',
  // 云函数基础URL
  baseUrl: 'https://sunshine20cn-ai.service.tcloudbase.com',
  // 云函数名
  functionName: 'interpret',
  // 超时时间（毫秒）
  timeout: 30000
}

/**
 * 调用 AI 解梦
 * @param {string} dreamText - 用户描述的梦境
 * @returns {Promise<string>} - AI 解读结果
 */
export async function interpretDream(dreamText) {
  if (!dreamText || dreamText.trim().length < 2) {
    throw new Error('梦境描述不能为空')
  }

  const url = `${CLOUDBASE_CONFIG.baseUrl}/${CLOUDBASE_CONFIG.functionName}`

  try {
    console.log(`[AI] 调用云函数: ${url}`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), CLOUDBASE_CONFIG.timeout)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Scf-Name': CLOUDBASE_CONFIG.functionName
      },
      body: JSON.stringify({
        action: 'interpret',
        dream: dreamText.trim()
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    if (data.success && data.result) {
      return data.result
    } else {
      throw new Error(data.error || '解梦失败')
    }
  } catch (e) {
    console.warn(`[AI] 云函数调用失败: ${e.message}，使用本地兜底`)
    // 云函数不可用时，使用本地关键词兜底
    return getMockInterpretation(dreamText)
  }
}

/**
 * 本地兜底解梦（关键词匹配）
 */
function getMockInterpretation(dream) {
  const t = dream.toLowerCase()

  if (t.includes('水') || t.includes('河') || t.includes('海'))
    return '梦中见水，寓意财运流动、情感滋润。你近日心情舒畅，工作生活中有新的机遇出现。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('火') || t.includes('火灾'))
    return '梦见火焰，象征热情与能量。你内心充满热情，近期可能有突破性进展。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('蛇'))
    return '梦中见蛇，是智慧与神秘的象征。你潜意识的智慧正在觉醒，会有意想不到的灵感。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('龙'))
    return '龙是中国祥瑞之兽，梦龙主大吉。你近期运势极佳，有贵人相助，诸事顺遂。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('房子') || t.includes('家') || t.includes('房间'))
    return '梦见房屋，象征你的内心世界和安全感。你内心渴望稳定，近期可能会有新的归属感。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('亲人') || t.includes('父母') || t.includes('家人'))
    return '梦见亲人，是思念与牵挂的体现。你与家人缘分深厚，可以主动联系，增进感情。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('飞翔') || t.includes('飞'))
    return '梦中飞翔，象征自由与突破。你内心渴望摆脱束缚，近期会有新的发展空间。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('死亡') || t.includes('去世') || t.includes('棺材'))
    return '梦见死亡，是旧我的消逝与新生的开始。你正在经历蜕变，放下过去，迎接新的人生阶段。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('迷路') || t.includes('找不到'))
    return '梦见迷路，表示你正在寻找方向。不要着急，答案会在行动中逐渐清晰。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('考试') || t.includes('上学'))
    return '梦见考试，是自我检验的象征。你正在为自己的目标努力，相信自己的准备。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('下雨') || t.includes('雨'))
    return '梦见下雨，象征洗涤与新生。春雨润物，寓意困难即将过去，好事将近。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('太阳') || t.includes('阳光'))
    return '梦见阳光明媚，是吉祥如意的象征。你心态积极向上，处处充满希望。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('山'))
    return '梦中山河壮阔，象征心胸开阔，前路光明。你有克服困难的勇气。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('钱') || t.includes('金'))
    return '梦见钱财，寓意财运回升。你对物质生活有了新的期待，勤劳致富是好兆头。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('结婚') || t.includes('婚礼'))
    return '梦见婚嫁，是喜庆与结合的象征。你近期人际关系和谐，可能有好的缘分出现。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('月亮') || t.includes('星星'))
    return '梦见星月，是宁静与美好的象征。你内心平和，近期会有温馨的时光。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('镜子'))
    return '梦见镜子，是自我审视的象征。你对自己有了新的认识。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('花'))
    return '梦见花开，是美好与希望的象征。近期有好事发生。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('猫') || t.includes('狗') || t.includes('鸟'))
    return '梦见小动物，是生活情趣的体现。你内心柔软，近期有小确幸发生。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('汽车') || t.includes('车'))
    return '梦见乘车前行，象征人生旅途的进展。你正朝着目标前进。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('小孩') || t.includes('孩子'))
    return '梦见孩子，是希望与生机的象征。生活中有新的可能等待着你。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('朋友') || t.includes('同学'))
    return '梦见朋友，是人缘的象征。你身边有贵人，近期可多与朋友交流。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
  if (t.includes('吃东西') || t.includes('吃饭'))
    return '梦见进食，是富足与满足的象征。你内心感到充实，近期生活安稳。\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'

  // 默认解读
  return `这个梦境富有深意。梦中的场景往往是我们内心世界的投射。\n\n你近日可能在某些方面有所思考或困扰，这个梦提醒你：保持内心的平静，顺其自然地面对生活中的变化。无论梦境如何，它们反映的是内心的期待与担忧，而非预示未来。\n\n㊗️ 愿你夜夜好眠，日日顺心。`
}
