document.addEventListener('DOMContentLoaded', () => {
    function configureDropdown(dropdownBtn, dropdownContent) {
        dropdownBtn.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', (event) => {
            if (!event.target.matches('.dropdown-btn')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    }

    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    dropdownBtns.forEach((dropdownBtn, index) => {
        const dropdownContent = dropdownContents[index];
        configureDropdown(dropdownBtn, dropdownContent);
    });
});