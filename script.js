document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost/fetch_data.php') // Adjust URL as needed
        .then(response => response.json())
        .then(data => {
            const semesterContainer = document.getElementById('semesterContainer');
            const totalBalanceElement = document.getElementById('totalBalance');
            const ewalletBalanceElement = document.getElementById('ewalletBalance');

            // Calculate total balance
            const totalBalance = data.reduce((total, semester) => total + parseFloat(semester.balance), 0);
            totalBalanceElement.textContent = `₱${totalBalance.toFixed(2)}`;

            // Simulated e-wallet balance
            const ewalletBalance = 1000;
            ewalletBalanceElement.textContent = `₱${ewalletBalance.toFixed(2)}`;

            // Function to group data by semester
            function groupBySemester(data) {
                return data.reduce((groups, semester) => {
                    const key = semester.semester;
                    if (!groups[key]) {
                        groups[key] = [];
                    }
                    groups[key].push(semester);
                    return groups;
                }, {});
            }

            // Function to create semester items
            function createSemesterItem(semester) {
                const semesterItem = document.createElement('div');
                semesterItem.className = 'semester-item';

                const semesterHeader = document.createElement('div');
                semesterHeader.className = 'semester-header';
                semesterHeader.innerHTML = `
                    <span>${semester[0].semester}</span>
                    <i class="fas fa-chevron-down"></i>
                `;

                const semesterDetails = document.createElement('div');
                semesterDetails.className = 'semester-details';

                semester.forEach((entry, index) => {
                    const entryDetails = document.createElement('div');
                    entryDetails.innerHTML = `
                        <p>Debit: ₱${parseFloat(entry.debit).toFixed(2)}</p>
                        <p>Credit: ₱${parseFloat(entry.credit).toFixed(2)}</p>
                        <p>Balance: ₱${parseFloat(entry.balance).toFixed(2)}</p>
                        <p>Reference Number: ${entry.referenceNumber}</p>
                        <p>${entry.dateTime}</p>
                    `;

                    // Add a one-line gap except after the last entry
                    if (index < semester.length - 1) {
                        entryDetails.style.marginBottom = '1rem';
                    }

                    semesterDetails.appendChild(entryDetails);
                });

                semesterItem.appendChild(semesterHeader);
                semesterItem.appendChild(semesterDetails);

                semesterHeader.addEventListener('click', function() {
                    semesterItem.classList.toggle('active');
                    semesterDetails.style.display = semesterDetails.style.display === 'none' ? 'block' : 'none';
                });

                return semesterItem;
            }

            // Group data by semester
            const groupedData = groupBySemester(data);

            // Generate semester items
            Object.values(groupedData).forEach(semester => {
                const semesterItem = createSemesterItem(semester);
                semesterContainer.appendChild(semesterItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
