const skillForm = document.querySelector(".skill-form");


// ===============================
// OFFER PAGE
// ===============================

if (skillForm) {

    skillForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const year = document.getElementById("year").value;
        const branch = document.getElementById("branch").value;

        const teach = document.getElementById("teach").value;
        const learn = document.getElementById("learn").value;

        const description =
            document.getElementById("description").value;


        const mode = document.querySelector(
            'input[name="mode"]:checked'
        );


        const days = document.querySelectorAll(
            'input[name="day"]:checked'
        );


        const contact =
            document.getElementById("contact").value;


        // Convert selected days into an array

        const availableDays = [];

        days.forEach(function(day) {

            availableDays.push(day.value);

        });


        // Create student object

        const student = {

            name: name,

            email: email,

            year: year,

            branch: branch,

            teach: teach,

            learn: learn,

            description: description,

            mode: mode ? mode.value : "",

            days: availableDays,

            contact: contact

        };


        // Get existing students

        let students = JSON.parse(
            localStorage.getItem("students")
        ) || [];


        // Add new student

        students.push(student);


        // Save students

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        alert("Your skill has been added successfully!");


        // Go to Explore page

        window.location.href = "explore.html";

    });

}


// ===============================
// EXPLORE PAGE
// ===============================

const studentGrid =
    document.getElementById("studentGrid");


if (studentGrid) {

    const students = JSON.parse(
        localStorage.getItem("students")
    ) || [];


    students.forEach(function(student) {

        const card =
            document.createElement("article");


        card.className = "student-card";


        // First letter for avatar

        const firstLetter = student.name
            .charAt(0)
            .toUpperCase();


        card.innerHTML = `

            <div class="student-header">

                <div class="large-avatar">
                    ${firstLetter}
                </div>

                <div>

                    <h3>${student.name}</h3>

                    <p>
                        ${student.year}
                        •
                        ${student.branch}
                    </p>

                </div>

            </div>


            <div class="student-skills">

                <span>

                    <strong>Can Teach:</strong>

                    ${student.teach}

                </span>


                <span>

                    <strong>Wants:</strong>

                    ${student.learn}

                </span>

            </div>


            <p>
                ${student.description}
            </p>


            <p>

                <strong>Mode:</strong>

                ${student.mode || "Not specified"}

            </p>


            <a href="#" class="profile-link">

                View Profile

            </a>

        `;


        studentGrid.appendChild(card);

    });

}


// ==========================
// PAID LEARNING PAGE
// ==========================

const paidSkillForm =
    document.getElementById("paidSkillForm");


const paidTeacherCards =
    document.getElementById("paidTeacherCards");



if (paidSkillForm) {

    // Display saved teachers when page opens

    displayPaidTeachers();


    paidSkillForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const teacher = {

                name:
                    document.getElementById(
                        "teacher-name"
                    ).value,

                skill:
                    document.getElementById(
                        "teach-skill"
                    ).value,

                fee:
                    document.getElementById(
                        "fee"
                    ).value,

                description:
                    document.getElementById(
                        "description"
                    ).value,

                contact:
                    document.getElementById(
                        "whatsapp"
                    ).value
              

            };


            // Get existing teachers

            let teachers = JSON.parse(
                localStorage.getItem("paidTeachers")
            ) || [];


            // Add new teacher

            teachers.push(teacher);


            // Save teachers

            localStorage.setItem(
                "paidTeachers",
                JSON.stringify(teachers)
            );


            alert(
                "Your paid skill has been published!"
            );


            // Clear form

            paidSkillForm.reset();


            // Display the new card

            displayPaidTeachers();

        }
    );

}


// ==========================
// DISPLAY PAID TEACHERS
// ==========================

function displayPaidTeachers() {

    if (!paidTeacherCards) {

        return;

    }


    const teachers = JSON.parse(
        localStorage.getItem("paidTeachers")
    ) || [];


    // Clear existing cards

    paidTeacherCards.innerHTML = "";


    teachers.forEach(function(teacher, index) {

        const card =
            document.createElement("article");


        card.className =
            "paid-teacher-card";


        card.innerHTML = `

            <h3>
                ${teacher.name}
            </h3>


            <p>

                <strong>Skill:</strong>

                ${teacher.skill}

            </p>


            <p>

                <strong>Fee:</strong>

                ₹${teacher.fee} / week

            </p>


            <p>

                ${teacher.description}

            </p>
            <p>

                <strong>Contact:</strong> ${teacher.contact}

            </p>

 <button
                type="button"
                class="delete-button"
                onclick="deletePaidTeacher(${index})"
            >

                Delete

            </button>
           
        `;


        paidTeacherCards.appendChild(card);

    });

}


// ==========================
// DELETE PAID TEACHER
// ==========================

function deletePaidTeacher(index) {

    let teachers = JSON.parse(
        localStorage.getItem("paidTeachers")
    ) || [];


    const confirmDelete = confirm(
        "Are you sure you want to delete this skill?"
    );


    if (confirmDelete) {

        // Remove selected teacher

        teachers.splice(index, 1);


        // Save updated list

        localStorage.setItem(
            "paidTeachers",
            JSON.stringify(teachers)
        );


        // Refresh cards

        displayPaidTeachers();

    }

}
// ==========================
// LIGHT / DARK MODE
// ==========================

const themeToggle = document.getElementById("themeToggle");


// Load saved theme

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

}


// Change theme

if (themeToggle) {

    updateThemeButton();

    themeToggle.addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }


        updateThemeButton();

    });

}


// Update button text

function updateThemeButton() {

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "☀️ Light Mode";

    } else {

        themeToggle.textContent = "🌙 Dark Mode";

    }

}