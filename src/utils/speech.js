/**
 * 语音识别 + 语音播报工具
 * 兼容微信内置浏览器
 */

// ============ 语音识别 ============

export function isSpeechRecognitionSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export function createSpeechRecognizer(onResult, onEnd, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) throw new Error('当前浏览器不支持语音识别')

  const recognition = new SpeechRecognition()
  recognition.lang = 'zh-CN'
  recognition.continuous = false
  recognition.interimResults = true
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    let finalText = ''
    let interimText = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) finalText += transcript
      else interimText += transcript
    }
    onResult(finalText, interimText)
  }

  recognition.onend = () => onEnd()
  recognition.onerror = (event) => {
    console.error('语音识别错误:', event.error)
    onError(event.error)
  }

  return recognition
}

// ============ 语音播报 ============

/**
 * 检查是否支持语音播报
 * 微信内置浏览器不支持 speechSynthesis
 */
export function isSpeechSynthesisSupported() {
  // 微信内置浏览器检测
  const ua = navigator.userAgent.toLowerCase()
  const isWechat = ua.includes('micromessenger')
  
  // 微信内置浏览器不支持语音播报
  if (isWechat) return false
  
  return !!window.speechSynthesis
}

/**
 * 播报文字
 */
export function speak(text, lang = 'zh-CN') {
  return new Promise((resolve, reject) => {
    // 检查微信环境
    const ua = navigator.userAgent.toLowerCase()
    const isWechat = ua.includes('micromessenger')
    if (isWechat) {
      reject(new Error('微信内置浏览器暂不支持语音播报，请在手机浏览器中打开'))
      return
    }

    if (!window.speechSynthesis) {
      reject(new Error('当前浏览器不支持语音播报'))
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.85
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // 等待语音列表加载
    const trySpeak = () => {
      const voices = window.speechSynthesis.getVoices()
      const zhVoice = voices.find(v => v.lang.startsWith('zh'))
        || voices.find(v => v.lang.includes('CN'))
      if (zhVoice) utterance.voice = zhVoice

      utterance.onend = () => resolve()
      utterance.onerror = (e) => {
        console.error('语音播报错误:', e)
        reject(new Error('语音播报失败'))
      }

      window.speechSynthesis.speak(utterance)
    }

    // 语音列表可能需要异步加载
    if (window.speechSynthesis.getVoices().length > 0) {
      trySpeak()
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null
        trySpeak()
      }
      // 超时兜底
      setTimeout(trySpeak, 500)
    }
  })
}

export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}
