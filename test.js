const { test } = require('testy');

test('Добавление задачи', () => {
    const initialLength = getTasks().length;
    addTask({ title: 'Тестовая задача' });
    const newLength = getTasks().length;
    
    if (newLength !== initialLength + 1) throw new Error('Задача не добавлена');