/**
 * 语音识别 + 语音播报工具
 * 使用浏览器原生 Web Speech API，无依赖
 */

// ============ 语音识别 ============

/**
 * 检查浏览器是否支持语音识别
 */
export function isSpeechRecognitionSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

/**
 * 创建语音识别实例
 * @param {function} onResult - 识别到文字时的回调
 * @param {function} onEnd - 识别结束时的回调
 * @param {function} onError - 出错时的回调
 * @returns {object} - recognition 对象
 */
export function createSpeechRecognizer(onResult, onEnd, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  
  if (!SpeechRecognition) {
    throw new Error('当前浏览器不支持语音识别')
  }

  const recognition = new SpeechRecognition()
  
  // 设置中文
  recognition.lang = 'zh-CN'
  recognition.continuous = false
  recognition.interimResults = true  // 中间结果也返回
  recognition.maxAlternatives = 1

  // 结果处理
  recognition.onresult = (event) => {
    let finalText = ''
    let interimText = ''
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalText += transcript
      } else {
        interimText += transcript
      }
    }
    
    onResult(finalText, interimText)
  }

  recognition.onend = () => {
    onEnd()
  }

  recognition.onerror = (event) => {
    console.error('语音识别错误:', event.error)
    onError(event.error)
  }

  return recognition
}

// ============ 语音播报 ============

/**
 * 检查是否支持语音播报
 */
export function isSpeechSynthesisSupported() {
  return !!window.speechSynthesis
}

/**
 * 播报文字
 * @param {string} text - 要播报的文字
 * @param {string} lang - 语言，默认 zh-CN
 */
export function speak(text, lang = 'zh-CN') {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('浏览器不支持语音播报'))
      return
    }

    // 停止之前的播报
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9    // 稍慢一点，方便老年人听
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // 尝试选择中文语音
    const voices = window.speechSynthesis.getVoices()
    const zhVoice = voices.find(v => v.lang.includes('zh'))
      || voices.find(v => v.lang.includes('CN'))
    if (zhVoice) {
      utterance.voice = zhVoice
    }

    utterance.onend = () => resolve()
    utterance.onerror = (e) => reject(e)

    window.speechSynthesis.speak(utterance)
  })
}

/**
 * 停止播报
 */
export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

/**
 * 获取可用语音列表
 */
export function getAvailableVoices() {
  if (!window.speechSynthesis) return []
  return window.speechSynthesis.getVoices().filter(v => v.lang.includes('zh'))
}
