document.addEventListener('DOMContentLoaded', function() {
    const prompts = [
        { category: 'Personal Details', prompts: ['What is your name?', 'What is your surname?', 'What is your age?', 'What is your gender?', 'Do you agree to the privacy terms?'] },
        { category: 'Education', prompts: ['What is your area of study?', 'What is your university?', 'What is your completion year?', 'What is your country?'] },
        { category: 'Voluntary', prompts: ['Are you up for voluntary?', 'Have you done any volantary work before?', 'What are your suggetstions to the campaign?'] },
        { category: 'Availability', prompts: ['Are you available in weekends ?', 'What is your telephone number?', 'What is your email?'] }
    ];    //Qustions to ask from user to get user details such as, personal details, education, interests in marine life and voluntary preference

    let currentStep = 0;
    let currentPromptIndex = 0;
    let userProfile = {};
    let progress = 0;

    function displayPrompt() {
        const promptsContainer = document.getElementById('prompts-container');
        promptsContainer.innerHTML = '';

        if (currentStep < prompts.length) {
            const prompt = prompts[currentStep].prompts[currentPromptIndex];
            let input;
            if (prompt.includes('agree to the privacy terms?') || prompt.includes('available for volunteering?')) {
                input = document.createElement('input');
                input.type = 'checkbox';
                input.id = `prompt-${currentPromptIndex}`;
                input.name = prompt;
                const label = document.createElement('label');
                label.htmlFor = `prompt-${currentPromptIndex}`;
                label.textContent = prompt;
                promptsContainer.appendChild(label);
                promptsContainer.appendChild(input);
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.placeholder = prompt;
                input.addEventListener('input', function() {
                    userProfile[prompt] = this.value;
                    updateProgress();
                });
                promptsContainer.appendChild(input);
            }

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', function() {
                currentPromptIndex++;
                if (currentPromptIndex >= prompts[currentStep].prompts.length) {
                    currentStep++;
                    currentPromptIndex = 0;
                }
                displayPrompt();
                updateProgress(); // Ensure progress is updated
            });

            const skipButton = document.createElement('button');
            skipButton.textContent = 'Skip';
            skipButton.addEventListener('click', function() {
                currentPromptIndex++;
                if (currentPromptIndex >= prompts[currentStep].prompts.length) {
                    currentStep++;
                    currentPromptIndex = 0;
                }
                displayPrompt();
                updateProgress(); // Ensure progress is updated
            });

            promptsContainer.appendChild(nextButton);
            promptsContainer.appendChild(skipButton);
        } else {
            // Display summary of answers in a pop-up window
            showSummary();
        }
    }

    function updateProgress() {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        progress = (currentStep / prompts.length) * 100;
        progressBar.value = progress;
        progressText.textContent = `${progress.toFixed(0)}% Complete`;
    }

    function showSummary() {
        let summary = '<h2>Summary of Your Answers</h2>';
        for (const key in userProfile) {
            summary += `<p>${key}: ${userProfile[key] || '-'}</p>`;
        }
        summary += '<p>Thank you for completing your profile!</p>';

        const summaryWindow = window.open("", "Summary", "width=600,height=400");
        summaryWindow.document.write(summary);
        summaryWindow.document.close();
    }

    displayPrompt();
});
