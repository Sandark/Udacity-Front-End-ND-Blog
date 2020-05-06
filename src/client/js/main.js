/* Elements declaration */
const textField = document.querySelector("#target-text");
const submitText = document.querySelector("#submit-text");
const combinedSubmitText = document.querySelector("#combined-submit-text");
const analysisResult = document.querySelector(".analysis_result");
const clearText = document.querySelector("#clear-text");

const loader = document.createElement("div");
loader.classList.add("loader_spinner");

const analysisContent = document.createElement("div");
analysisContent.classList.add("analysis_content");


function showLoadingSpinner() {
    analysisResult.innerHTML = "";
    analysisResult.appendChild(loader);
}

function adjustAnalysisContent(res) {
    const tempFragment = document.createDocumentFragment();

    Object.keys(res).forEach(key => {
        const estimation = document.createElement("div");
        estimation.classList.add("analysis_estimation");

        const estimationType = document.createElement("div");
        estimationType.classList.add("analysis_type");
        estimationType.textContent = key;

        const estimationValue = document.createElement("div");
        estimationValue.classList.add("analysis_type_value");
        estimationValue.textContent = res[key];

        estimation.appendChild(estimationType);
        estimation.appendChild(estimationValue);

        tempFragment.appendChild(estimation);
    })

    analysisContent.appendChild(tempFragment);

    return analysisContent;
}

submitText.addEventListener("click", evt => {
    analysisContent.innerHTML = "";
    analysisResult.classList.add("visible");
    showLoadingSpinner();

    Client.postRequest("/analyse_sentiment", {text: textField.value})
        .then(res => {
            let analysisContent = adjustAnalysisContent(res);

            analysisResult.appendChild(analysisContent);
        })
        .then(() => {
            Client.postRequest("/analyse_entities", {text: textField.value})
                .then(res => {
                    let analysisContent = adjustAnalysisContent(res);
                    analysisResult.removeChild(loader);
                })
        })
})

combinedSubmitText.addEventListener("click", evt => {
    analysisContent.innerHTML = "";
    analysisResult.classList.add("visible");
    showLoadingSpinner();

    Client.postRequest("/analyse_combined", {text: textField.value})
        .then(res => {
            let analysisContent = adjustAnalysisContent(res);

            analysisResult.removeChild(loader);
            analysisResult.appendChild(analysisContent);
        })
})

clearText.addEventListener("click", evt => {
    textField.value = "";
    analysisResult.classList.remove("visible");
    analysisResult.innerHTML = "";
})