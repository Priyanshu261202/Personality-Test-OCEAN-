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
            general: "You are highly organized and goal-driven, with a strong sense of responsibility and attention to detail.",
            strengths: [
                "Excellent at meeting deadlines",
                "Good at long-term planning",
                "Reliable and trustworthy",
                "High quality of work"
            ],
            career: "You're well-suited for management roles, project management, or any position requiring organization and reliability.",
            relationships: "People trust you to follow through on commitments and maintain order in shared spaces.",
            challenges: "You might sometimes be too hard on yourself or struggle with perfectionism."
        },
        low: {
            general: "You are flexible and spontaneous, preferring to go with the flow rather than stick to rigid plans.",
            strengths: [
                "Adaptable to change",
                "Good at thinking on your feet",
                "Creative problem-solver",
                "Relaxed approach to life"
            ],
            career: "You might excel in roles requiring creativity, flexibility, and quick adaptation to change.",
            relationships: "You bring spontaneity and fun to relationships, helping others relax and enjoy the moment.",
            challenges: "You might sometimes struggle with deadlines or maintaining long-term commitments."
        }
    },
    extraversion: {
        high: {
            general: "You gain energy from social interactions and enjoy being around others. You're naturally expressive and outgoing.",
            strengths: [
                "Great at networking",
                "Natural leader in groups",
                "Engaging communicator",
                "Quick to make friends"
            ],
            career: "You might excel in sales, teaching, management, or any role involving lots of social interaction.",
            relationships: "You're often the life of the party and good at bringing people together.",
            challenges: "You might sometimes overwhelm quieter people or struggle with alone time."
        },
        low: {
            general: "You recharge through solitude and prefer meaningful one-on-one interactions over large group activities.",
            strengths: [
                "Deep thinker",
                "Good listener",
                "Independent worker",
                "Meaningful relationships"
            ],
            career: "You might excel in roles requiring focus and independence, like research, writing, or technical work.",
            relationships: "You form deep, meaningful connections and are a loyal friend to a select few.",
            challenges: "You might sometimes feel drained in highly social situations or struggle with networking."
        }
    },
    agreeableness: {
        high: {
            general: "You are naturally empathetic and cooperative, always considering others' feelings and needs.",
            strengths: [
                "Great team player",
                "Skilled at conflict resolution",
                "Trusted confidant",
                "Supportive friend"
            ],
            career: "You might excel in counseling, teaching, healthcare, or any role focused on helping others.",
            relationships: "You're often the peacemaker and create harmony in relationships.",
            challenges: "You might sometimes put others' needs before your own or avoid necessary confrontation."
        },
        low: {
            general: "You are direct and objective, valuing honesty and logic over emotional harmony.",
            strengths: [
                "Good at making tough decisions",
                "Direct communicator",
                "Independent thinker",
                "Strong boundaries"
            ],
            career: "You might excel in analytical roles, leadership positions, or any job requiring tough decision-making.",
            relationships: "You bring honesty and clarity to relationships, and people know where they stand with you.",
            challenges: "You might sometimes come across as too direct or struggle with emotional situations."
        }
    },
    neuroticism: {
        high: {
            general: "You are highly sensitive and emotionally aware, experiencing life's ups and downs deeply.",
            strengths: [
                "Emotionally perceptive",
                "Detail-oriented",
                "Careful decision-maker",
                "Empathetic to others"
            ],
            career: "You might excel in creative fields, counseling, or roles requiring attention to detail and risk awareness.",
            relationships: "You bring emotional depth and understanding to relationships.",
            challenges: "You might sometimes worry too much or feel overwhelmed by stress."
        },
        low: {
            general: "You are emotionally stable and resilient, maintaining composure under pressure.",
            strengths: [
                "Good crisis manager",
                "Steady under pressure",
                "Reliable decision-maker",
                "Positive outlook"
            ],
            career: "You might excel in high-pressure roles, leadership positions, or crisis management.",
            relationships: "You bring stability and calm to relationships, helping others stay grounded.",
            challenges: "You might sometimes miss emotional cues or appear less sympathetic to others' worries."
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

    
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function calculateTraitScore(trait) {
    const traitAnswers = answers.filter(answer => answer.trait === trait);
    if (traitAnswers.length === 0) return 0;

    let sum = 0;
    traitAnswers.forEach(answer => {
        sum += Number(answer.value);
    });

    const average = sum / traitAnswers.length;
    return (average / 5) * 100;
}

function showResults() {
    document.getElementById('test-section').classList.remove('active');
    document.getElementById('results').classList.add('active');

    const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

    traits.forEach(trait => {
        const score = calculateTraitScore(trait);
        const progressBar = document.getElementById(`${trait}-bar`);
        const description = document.getElementById(`${trait}-description`);

        if (progressBar) {
            progressBar.style.width = `${score}%`;
        }

        if (description) {
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
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('intro').classList.add('active');

    
    document.querySelectorAll('.rating-btn').forEach(button => {
        button.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            
            
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            
            
            let actualValue = value;
            if (questions[currentQuestion].reverse) {
                actualValue = 6 - value; 
            }
            
            answers[currentQuestion] = {
                trait: questions[currentQuestion].trait,
                value: actualValue
            };
            
            
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
