chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes('freelancer.com')) {
    chrome.tabs.sendMessage(tab.id, { action: 'autofill' }, (response) => {
      console.log(response.status);
    });
  }
});