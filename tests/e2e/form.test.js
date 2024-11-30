const { test, expect } = require('@playwright/test');

test('Перевірка можливості введення імені та відправки форми', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    
    await page.click('#submit-button');

    const nameValue = await page.inputValue('#name');
    const emailValue = await page.inputValue('#email');
    expect(nameValue).toBe('');
    expect(emailValue).toBe('');
});

test('Перевірка можливості введення email та відправки форми', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.fill('#email', 'jane@example.com');
    await page.fill('#name', 'Jane Doe');
    
    await page.click('#submit-button');

    const emailValue = await page.inputValue('#email');
    expect(emailValue).toBe('');
});

test('Перевірка можливості вибору чекбоксу та відправки форми', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.check('#subscribe');
    await page.fill('#name', 'User');
    await page.fill('#email', 'user@example.com');
    
    await page.click('#submit-button');

    const checkboxState = await page.isChecked('#subscribe');
    expect(checkboxState).toBe(false);
});

test('Перевірка очищення форми при натисканні кнопки "Delete"', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.fill('#name', 'Name');
    await page.fill('#email', 'name@example.com');
    await page.check('#subscribe');
    
    await page.click('#delete-button');

    const nameValue = await page.inputValue('#name');
    const emailValue = await page.inputValue('#email');
    const checkboxState = await page.isChecked('#subscribe');

    expect(nameValue).toBe('');
    expect(emailValue).toBe('');
    expect(checkboxState).toBe(false);
});

