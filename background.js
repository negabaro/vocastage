chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  (async () => {
    const res = await fetch(
      `https://twinword-word-graph-dictionary.p.rapidapi.com/definition_kr/?entry="contemplate""`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
          "x-rapidapi-key": key
        }
      }
    ).catch(err => {
      console.log(err);
    });

    const data = await res.json();
    console.log(`${data.meaning.korean}`);
    sendResponse({ data });
  })();
});
