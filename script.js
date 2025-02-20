const questions = [
    {
        text: "I feel energized after spending time with a group of people.",
        trait: "extraversion"
    },
    {
        text: "I like to keep my room/workspace neat and organized.",
        trait: "conscientiousness"
    },
    {
        text: "I tend to overthink small decisions in daily life.",
        trait: "neuroticism"
    },
    {
        text: "I enjoy watching documentaries or learning about new topics online.",
        trait: "openness"
    },
    {
        text: "I find it easy to understand how others are feeling.",
        trait: "agreeableness"
    },
    {
        text: "I prefer texting over phone calls.",
        trait: "extraversion",
        reverse: true
    },
    {
        text: "I like trying food from different cultures.",
        trait: "openness"
    },
    {
        text: "I rarely get stressed about deadlines or commitments.",
        trait: "neuroticism",
        reverse: true
    },
    {
        text: "I make to-do lists for my daily tasks.",
        trait: "conscientiousness"
    },
    {
        text: "I find it hard to say no when someone asks for help.",
        trait: "agreeableness"
    },
    {
        text: "I enjoy exploring new places by myself.",
        trait: "openness"
    },
    {
        text: "I often take the lead in group activities or projects.",
        trait: "extraversion"
    }
];

const traitDescriptions = {
    openness: {
        high: {
            general: "You are naturally curious and adventurous. Your mind is like a sponge, always ready to absorb new experiences and ideas.",
            strengths: [
                "Quick to learn new skills",
                "Excellent at thinking outside the box",
                "Appreciative of art and beauty",
                "Good at seeing the big picture"
            ],
            career: "You might excel in creative fields, research, academia, or any role that involves innovation and exploring new possibilities.",
            relationships: "You bring excitement and fresh perspectives to relationships, always ready to try new experiences together.",
            challenges: "Sometimes you might feel restless with routine or struggle to focus on practical matters."
        },
        low: {
            general: "You are grounded and practical, preferring familiar routines and concrete experiences over abstract ideas.",
            strengths: [
                "Reliable and consistent",
                "Good at maintaining traditions",
                "Practical problem-solver",
                "Detail-oriented"
            ],
            career: "You might excel in roles requiring consistency and attention to detail, such as accounting, administration, or technical work.",
            relationships: "You bring stability and reliability to relationships, creating a sense of security and comfort.",
            challenges: "You might sometimes miss opportunities for growth by staying too much in your comfort zone."
        }
    },
    conscientiousness: {
        high: {
            general: "You are organized, responsible, and goal-oriented. You have a strong sense of duty and prefer to plan things in advance.",
            strengths: [
                "Excellent at planning and organizing",
                "Reliable and dependable",
                "Strong work ethic",
                "Detail-oriented and thorough"
            ],
            career: "You might excel in management, administration, or any role requiring attention to detail and systematic approaches.",
            relationships: "You bring stability and reliability to relationships, always following through on commitments.",
            challenges: "You might sometimes be too rigid or perfectionistic, having trouble with spontaneity."
        },
        low: {
            general: "You are flexible and spontaneous, preferring to go with the flow rather than sticking to strict plans.",
            strengths: [
                "Adaptable and easy-going",
                "Good at handling unexpected changes",
                "Creative problem-solver",
                "Comfortable with uncertainty"
            ],
            career: "You might excel in creative fields, emergency response, or roles requiring adaptability and quick thinking.",
            relationships: "You bring spontaneity and flexibility to relationships, keeping things fresh and exciting.",
            challenges: "You might sometimes struggle with organization and meeting deadlines."
        }
    },
    extraversion: {
        high: {
            general: "You are outgoing and energized by social interaction. You enjoy being around people and seek out social situations.",
            strengths: [
                "Excellent communication skills",
                "Natural networker",
                "Enthusiastic team player",
                "Good at motivating others"
            ],
            career: "You might excel in sales, public relations, teaching, or any role involving frequent interaction with others.",
            relationships: "You bring energy and enthusiasm to relationships, easily making connections with others.",
            challenges: "You might sometimes find it difficult to work alone or need more quiet time."
        },
        low: {
            general: "You are introspective and comfortable with solitude. You prefer deeper one-on-one connections to large group settings.",
            strengths: [
                "Good at deep thinking",
                "Strong listening skills",
                "Independent worker",
                "Thoughtful decision-maker"
            ],
            career: "You might excel in research, writing, technical fields, or roles requiring focused individual work.",
            relationships: "You bring depth and thoughtfulness to relationships, forming meaningful connections.",
            challenges: "You might sometimes need to push yourself to be more socially active."
        }
    },
    agreeableness: {
        high: {
            general: "You are compassionate and cooperative, always considering others' feelings. You naturally tend to put others first.",
            strengths: [
                "Excellent team player",
                "Empathetic and understanding",
                "Good at conflict resolution",
                "Trusted by others"
            ],
            career: "You might excel in counseling, healthcare, teaching, or any role focused on helping others.",
            relationships: "You bring harmony and understanding to relationships, always willing to compromise.",
            challenges: "You might sometimes neglect your own needs while caring for others."
        },
        low: {
            general: "You are independent and straightforward, prioritizing logic over emotions in decision-making.",
            strengths: [
                "Good at making tough decisions",
                "Direct communicator",
                "Independent thinker",
                "Strong negotiator"
            ],
            career: "You might excel in leadership, criticism, analysis, or roles requiring tough decision-making.",
            relationships: "You bring honesty and directness to relationships, maintaining clear boundaries.",
            challenges: "You might sometimes come across as too direct or unsympathetic."
        }
    },
    neuroticism: {
        high: {
            general: "You are sensitive and emotionally responsive, experiencing feelings intensely. You're highly attuned to potential challenges.",
            strengths: [
                "Detailed risk assessor",
                "Empathetic to others' struggles",
                "Good at anticipating problems",
                "Passionate and driven"
            ],
            career: "You might excel in quality control, risk assessment, or creative fields where emotional depth is valuable.",
            relationships: "You bring depth and emotional awareness to relationships, forming intense connections.",
            challenges: "You might sometimes struggle with stress and anxiety management."
        },
        low: {
            general: "You are emotionally stable and resilient, maintaining composure under pressure. You tend to stay calm in stressful situations.",
            strengths: [
                "Excellent stress management",
                "Stable under pressure",
                "Reliable decision-maker",
                "Positive outlook"
            ],
            career: "You might excel in crisis management, leadership, or high-pressure environments.",
            relationships: "You bring stability and calm to relationships, helping others stay grounded.",
            challenges: "You might sometimes miss subtle emotional cues from others."
        }
    }
};

let currentQuestion = 0;
let answers = [];

function startTest() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('test-section').classList.add('active');
    displayQuestion();
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress');
    const questionNumber = document.getElementById('question-number');

    questionContainer.innerHTML = `<h3>${questions[currentQuestion].text}</h3>`;
    questionNumber.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    // Reset button selections
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // If this question was already answered, select the previous answer
    if (answers[currentQuestion]) {
        const value = questions[currentQuestion].reverse 
            ? 6 - answers[currentQuestion].value 
            : answers[currentQuestion].value;
        document.querySelector(`.rating-btn[data-value="${value}"]`)?.classList.add('selected');
    }
}

function calculateTraitScore(trait) {
    const traitAnswers = answers.filter(answer => answer.trait === trait);
    if (traitAnswers.length === 0) return 0;

    let sum = 0;
    traitAnswers.forEach(answer => {
        sum += answer.value;
    });

    return (sum / (traitAnswers.length * 5)) * 100;
}

function showResults() {
    document.getElementById('test-section').classList.remove('active');
    document.getElementById('results').classList.add('active');

    // Scroll to top when showing results
    window.scrollTo(0, 0);

    const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

    traits.forEach(trait => {
        const score = calculateTraitScore(trait);
        const progressBar = document.getElementById(`${trait}-bar`);
        const description = document.getElementById(`${trait}-description`);

        if (progressBar) {
            progressBar.style.width = `${score}%`;
        }

        if (description && traitDescriptions[trait]) {
            const traitLevel = score > 60 ? 'high' : 'low';
            const traitInfo = traitDescriptions[trait][traitLevel];
            
            description.innerHTML = `
                <div class="trait-section">
                    <p class="trait-general"><strong>Overview:</strong> ${traitInfo.general}</p>
                    <div class="trait-details">
                        <h4>Your Key Strengths:</h4>
                        <ul class="trait-strengths">
                            ${traitInfo.strengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                        <div class="trait-insights">
                            <p class="trait-career"><strong>Career Insights:</strong> ${traitInfo.career}</p>
                            <p class="trait-relationships"><strong>Relationship Dynamics:</strong> ${traitInfo.relationships}</p>
                            <p class="trait-challenges"><strong>Growth Areas:</strong> ${traitInfo.challenges}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}

function restartTest() {
    currentQuestion = 0;
    answers = [];
    document.getElementById('results').classList.remove('active');
    document.getElementById('intro').classList.add('active');

    // Reset progress bars
    const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    traits.forEach(trait => {
        const progressBar = document.getElementById(`${trait}-bar`);
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('intro').classList.add('active');
    
    // Add click handlers for rating buttons
    document.querySelectorAll('.rating-btn').forEach(button => {
        button.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            
            // Update button states
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Handle reverse scoring if needed
            let actualValue = value;
            if (questions[currentQuestion].reverse) {
                actualValue = 6 - value; 
            }
            
            // Save answer
            answers[currentQuestion] = {
                trait: questions[currentQuestion].trait,
                value: actualValue
            };
            
            // Move to next question or show results after a short delay
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    displayQuestion();
                } else {
                    showResults();
                }
            }, 300);
        });
    });
});