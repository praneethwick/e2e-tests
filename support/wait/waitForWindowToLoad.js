module.exports = () => {
  let retries = 5;
  let maxRetries = 25;
  
  const pageSource = () => {
    return browser.getPageSource().length.toString();
  }

  let source = pageSource();
  const check = () => {
    maxRetries--;
    
    if (maxRetries < 1) {
      console.log(`max retry count reached. Won't resume waiting`)
      return true;
    }

    if (pageSource() === source) {
      if (retries <= 0) {
        console.log('finished waiting')
        return true;
      }
      retries--;
      return false;
    }
    
    else {
      retries = 5;
      source = pageSource();
      return false;
    }
  }

  browser.waitUntil(() => {
    return check()
  }, 40000, 'Page didnt load in 40s', 400)

  source = null
}