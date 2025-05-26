document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ageForm');
  const errorEl = document.getElementById('error');
  const resultEl = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    errorEl.textContent = '';
    resultEl.textContent = '';

    const day = form.day.value.trim();
    const month = form.month.value.trim();
    const year = form.year.value.trim();

    if (!day || !month || !year) {
      errorEl.textContent = 'Please enter day, month, and year.';
      return;
    }

    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);

    if (!isValidDate(dayNum, monthNum, yearNum)) {
      errorEl.textContent = 'Please enter a valid date.';
      return;
    }

    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();

    if (birthDate > today) {
      errorEl.textContent = 'Date of birth cannot be in the future.';
      return;
    }

    const age = calculateAge(birthDate, today);

    resultEl.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
  });

  function isValidDate(day, month, year) {
    if (
      Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year) ||
      year < 1900 || year > 2100 ||
      month < 1 || month > 12 ||
      day < 1 || day > 31
    ) return false;

    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  function calculateAge(birthDate, today) {
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }
});
