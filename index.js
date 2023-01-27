const inquirer = require("inquirer");
const fs = require("fs");

const team = [];

function promptManager() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the team manager's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the team manager's employee ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the team manager's email address?",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the team manager's office number?",
            },
        ])
        .then((answers) => {
            const manager = {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                officeNumber: answers.officeNumber,
                role: "Manager",
            };
            team.push(manager);
            promptTeam();
        });
}

function promptTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "memberType",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "Finish building team"],
            },
        ])
        .then((answers) => {
            if (answers.memberType === "Engineer") {
                promptEngineer();
            } else if (answers.memberType === "Intern") {
                promptIntern();
            } else {
                buildTeam();
            }
        });
}

function promptEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineer's employee ID?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineer's email address?",
            },
            {
                type: "input",
                name: "github",
                message: "What is the engineer's GitHub username?",
            },
        ])
        .then((answers) => {
            const engineer = {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                github: answers.github,
                role: "Engineer",
            };
            team.push(engineer);
            promptTeam();
        });
}

function promptIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the intern's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the intern's employee ID"


            },
            {
                type: "input",
                name: "email",
                message: "What is the intern's email address?",
            },
            {
                type: "input",
                name: "school",
                message: "What school is the intern attending?",
            },
        ])
        .then((answers) => {
            const intern = {
                name: answers.name,
                id: answers.id,
                email: answers.email,
                school: answers.school,
                role: "Intern",
            };
            team.push(intern);
            promptTeam();
        });
}

function buildTeam() {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Team Profile</title>
    </head>
    <body>
        <h1>Team Profile</h1>
        ${team.map((member) => `
        <div>
            <h2>${member.name}</h2>
            <p>ID: ${member.id}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            <p>Role: ${member.role}</p>
            ${member.github ? `<p>GitHub: <a href="https://github.com/${member.github}" target="_blank">${member.github}</a></p>` : ""}
            ${member.officeNumber ? `<p>Office Number: ${member.officeNumber}</p>` : ""}
            ${member.school ? `<p>School: ${member.school}</p>` : ""}
        </div>
        `).join("")}
    </body>
    </html>
    `;



    fs.writeFileSync("team.html", html);
    console.log("Team profile has been generated in team.html");
}

promptManager();

