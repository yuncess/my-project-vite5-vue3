export const initCommonConfig = () =>
  new Promise((resolve, reject) => {
    const prePath = import.meta.env.MODE === 'production' ? '/config.json' : '/config.dev.json'
    fetch(prePath + '?' + new Date().getTime())
      .then((response) => response.json())
      .catch(() => {
        reject(null)
      })
      .then((data) => {
        if (!data) {
          reject(null)
        }
        for (const [key, value] of Object.entries(data)) {
          window.localStorage.setItem(key, value as string)
        }
        resolve(data)
      })
      .catch(() => {
        reject(null)
      })
  })

export const getCommonConfig = () => {
  return {}
}
