async function getTestApi(word) {
  console.log("word", word);
  const res = await fetch(
    `https://twinword-word-graph-dictionary.p.rapidapi.com/definition_kr/?entry="contemplate""`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
        "x-rapidapi-key": "e9a474a5admsha5f017147412678p146f75jsncb63d54cb550"
      }
    }
  ).catch(err => {
    console.log(err);
  });
  const data = await res.json();
  return data;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  if (request.contentScriptQuery == "queryTest") {
    (async () => {
      const payload = await getTestApi(request.word);
      console.log("!!!!!!!!!!!!!!!!!!!!! payload", payload);
      const result = payload.meaning.korean;
      sendResponse({ result });
    })();

    return true; // Will respond asynchronously.
    /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  }
});
