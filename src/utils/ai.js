/**
 * 周公宝 — AI 解梦核心
 * 通过 OpenClaw 桌面客户端的 /api/chat 接口调用 AI
 */

const AI_CONFIG = {
  // 优先尝试 OpenClaw Gateway
  endpoints: [
    'http://localhost:18789/api/chat',
    'http://localhost:18792/api/chat', 
    '/api/chat'
  ],
  model: 'qclaw/modelroute',
  timeout: 45000
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

  // 构造周公角色 prompt
  const systemPrompt = `你是周公，古代著名的解梦大师。你融合了《周公解梦》的传统智慧，用温暖、亲切、富有哲理的语言，为人们解读梦境的含义。你的解读风格：
- 融合传统周易文化与现代心理学视角
- 语言温暖亲切，适合中老年用户（所以叫"周公宝"）
- 先描述梦境可能的象征意义，再给出积极向上的生活建议
- 总字数控制在200-400字之间
- 用第二人称"你"来称呼用户
- 最后给出一句吉祥寄语（用"㊗️"符号开头）

请直接输出解梦内容，不要加标题，不要加"以下是"等前缀，直接开始解梦。`

  const userMessage = `用户做了一个梦，内容如下：\n"${dreamText.trim()}"`

  // 尝试各个端点
  let lastError = null

  for (const endpoint of AI_CONFIG.endpoints) {
    try {
      console.log(`[AI] 尝试端点: ${endpoint}`)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.timeout)

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          model: AI_CONFIG.model,
          stream: false
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      let content = data.message?.content || data.result?.content || data.content || data.text

      if (content && content.trim()) {
        return content.trim()
      }
    } catch (e) {
      console.warn(`[AI] 端点 ${endpoint} 失败:`, e.message)
      lastError = e
    }
  }

  // 所有端点都失败，使用模拟数据
  console.warn('[AI] 所有端点失败，使用模拟解梦')
  return getMockInterpretation(dreamText)
}

/**
 * 模拟解梦结果（当 AI 服务不可用时）
 */
function getMockInterpretation(dream) {
  // 根据关键词简单匹配
  const keywords = {
    '水': { base: '梦中见水，寓意财运流动、情感滋润。', meaning: '你近日心情舒畅，工作生活中有新的机遇出现。' },
    '火': { base: '梦见火焰，象征热情与能量。', meaning: '你内心充满热情，近期可能有突破性进展。' },
    '蛇': { base: '梦中见蛇，是智慧与神秘的象征。', meaning: '你潜意识的智慧正在觉醒，会有意想不到的灵感。' },
    '龙': { base: '龙是中国祥瑞之兽，梦龙主大吉。', meaning: '你近期运势极佳，有贵人相助，诸事顺遂。' },
    '房子': { base: '梦见房屋，象征你的内心世界和安全感。', meaning: '你内心渴望稳定，近期可能会有新的归属感。' },
    '亲人': { base: '梦见亲人，是思念与牵挂的体现。', meaning: '你与家人缘分深厚，可以主动联系，增进感情。' },
    '飞翔': { base: '梦中飞翔，象征自由与突破。', meaning: '你内心渴望摆脱束缚，近期会有新的发展空间。' },
    '死亡': { base: '梦见死亡，是旧我的消逝与新生的开始。', meaning: '你正在经历蜕变，放下过去，迎接新的人生阶段。' },
    '迷路': { base: '梦见迷路，表示你正在寻找方向。', meaning: '不要着急，答案会在行动中逐渐清晰。' },
    '考试': { base: '梦见考试，是自我检验的象征。', meaning: '你正在为自己的目标努力，相信自己的准备。' },
  }

  let matched = null
  for (const [key, val] of Object.entries(keywords)) {
    if (dream.includes(key)) {
      matched = val
      break
    }
  }

  if (matched) {
    return `${matched.base}\n\n${matched.meaning}\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。`
  }

  // 默认解读
  return `这个梦境富有深意。梦中的场景往往是我们内心世界的投射。\n\n你近日可能在某些方面有所思考或困扰，这个梦提醒你：保持内心的平静，顺其自然地面对生活中的变化。\n\n无论梦境如何，都请放心，它们往往反映的是我们内心的期待与担忧，而非预示未来。\n\n㊗️ 愿你夜夜好眠，日日顺心。`
}
