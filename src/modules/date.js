import { format, isToday, isPast, compareAsc } from 'date-fns';

const dueDate = new Date('2025-12-21');

if (isToday(dueDate)) {
  console.log("Due today!");
}

if (isPast(dueDate)) {
  console.log("This task is overdue!");
}

console.log("Formatted Date:", format(dueDate, 'dd MMM yyyy')); // 25 May 2025


import { isBefore, isAfter } from 'date-fns';

const due = new Date('2025-05-21');
const today = new Date();

console.log(isAfter(due, today)); // true ya false


import { differenceInDays } from 'date-fns';

const daysLeft = differenceInDays(new Date('2025-05-25'), new Date());
console.log(daysLeft);

import { parseISO } from 'date-fns';

const dateObj = parseISO('2025-05-25');
console.log(dateObj)