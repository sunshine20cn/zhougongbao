/**
 * 周公宝 - AI 解梦云函数
 * 部署到腾讯云 CloudBase
 */

const cloud = require('wx-server-sdk')
cloud.init({ 
  env: cloud.DYNAMIC_CURRENT_ENV 
})

// AI 解梦核心逻辑
const DREAM_INTERPRETATIONS = {
  get(text) {
    const t = text.toLowerCase()
    if (t.includes('水') || t.includes('河') || t.includes('海')) 
      return '梦中见水，寓意财运流动、情感滋润。你近日心情舒畅，工作生活中有新的机遇出现。'
    if (t.includes('火') || t.includes('火灾') || t.includes('燃烧'))
      return '梦见火焰，象征热情与能量。你内心充满热情，近期可能有突破性进展。'
    if (t.includes('蛇'))
      return '梦中见蛇，是智慧与神秘的象征。你潜意识的智慧正在觉醒，会有意想不到的灵感。'
    if (t.includes('龙'))
      return '龙是中国祥瑞之兽，梦龙主大吉。你近期运势极佳，有贵人相助，诸事顺遂。'
    if (t.includes('房子') || t.includes('家') || t.includes('房间'))
      return '梦见房屋，象征你的内心世界和安全感。你内心渴望稳定，近期可能会有新的归属感。'
    if (t.includes('亲人') || t.includes('父母') || t.includes('家人'))
      return '梦见亲人，是思念与牵挂的体现。你与家人缘分深厚，可以主动联系，增进感情。'
    if (t.includes('飞翔') || t.includes('飞'))
      return '梦中飞翔，象征自由与突破。你内心渴望摆脱束缚，近期会有新的发展空间。'
    if (t.includes('死亡') || t.includes('去世') || t.includes('棺材'))
      return '梦见死亡，是旧我的消逝与新生的开始。你正在经历蜕变，放下过去，迎接新的人生阶段。'
    if (t.includes('迷路') || t.includes('找不到'))
      return '梦见迷路，表示你正在寻找方向。不要着急，答案会在行动中逐渐清晰。'
    if (t.includes('考试') || t.includes('上学'))
      return '梦见考试，是自我检验的象征。你正在为自己的目标努力，相信自己的准备。'
    if (t.includes('钱') || t.includes('金') || t.includes('财'))
      return '梦见钱财，寓意财运回升。你对物质生活有了新的期待，勤劳致富是好兆头。'
    if (t.includes('结婚') || t.includes('婚礼'))
      return '梦见婚嫁，是喜庆与结合的象征。你近期人际关系和谐，可能有好的缘分出现。'
    if (t.includes('吃东西') || t.includes('吃饭') || t.includes('食物'))
      return '梦见进食，是富足与满足的象征。你内心感到充实，近期生活安稳。'
    if (t.includes('下雨') || t.includes('雨'))
      return '梦见下雨，象征洗涤与新生。春雨润物，寓意困难即将过去，好事将近。'
    if (t.includes('太阳') || t.includes('阳光'))
      return '梦见阳光明媚，是吉祥如意的象征。你心态积极向上，处处充满希望。'
    if (t.includes('月亮') || t.includes('星星'))
      return '梦见星月，是宁静与美好的象征。你内心平和，近期会有温馨的时光。'
    if (t.includes('山'))
      return '梦中山河壮阔，象征心胸开阔，前路光明。你有克服困难的勇气。'
    if (t.includes('小孩') || t.includes('孩子'))
      return '梦见孩子，是希望与生机的象征。生活中有新的可能等待着你。'
    if (t.includes('朋友') || t.includes('同学'))
      return '梦见朋友，是人缘的象征。你身边有贵人，近期可多与朋友交流。'
    if (t.includes('狗'))
      return '梦见狗，是忠诚与守护的象征。说明你有可靠的人在身边。'
    if (t.includes('猫'))
      return '梦见猫，是独立与灵敏的象征。你直觉敏锐，善于发现机会。'
    if (t.includes('鸟'))
      return '梦见飞鸟，是自由与理想的象征。你内心有更高的追求。'
    if (t.includes('汽车') || t.includes('车'))
      return '梦见乘车前行，象征人生旅途的进展。你正朝着目标前进。'
    if (t.includes('镜子'))
      return '梦见镜子，是自我审视的象征。你对自己有了新的认识。'
    if (t.includes('花'))
      return '梦见花开，是美好与希望的象征。近期有好事发生。'
    return null
  }
}

// 云函数入口
exports.main = async (event, context) => {
  const { action, dream } = event

  // 解梦接口
  if (action === 'interpret') {
    if (!dream || dream.trim().length < 2) {
      return { success: false, error: '梦境描述不能为空' }
    }
    if (dream.trim().length > 500) {
      return { success: false, error: '梦境描述不能超过500字' }
    }

    const matched = DREAM_INTERPRETATIONS.get(dream.trim())
    let result
    if (matched) {
      result = matched + '\n\n㊗️ 近期运势平稳，保持乐观心态，好运自来。'
    } else {
      result = `这个梦境富有深意。梦中的场景往往是我们内心世界的投射。\n\n你近日可能在某些方面有所思考或困扰，这个梦提醒你：保持内心的平静，顺其自然地面对生活中的变化。无论梦境如何，它们反映的是内心的期待与担忧，而非预示未来。\n\n㊗️ 愿你夜夜好眠，日日顺心。`
    }
    
    return { success: true, result }
  }

  return { success: false, error: '未知操作' }
}
