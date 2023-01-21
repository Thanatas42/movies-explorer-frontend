const { currentYear } = require('./Footer');

it('The date falls within the interval', () => {
    expect(typeof currentYear).toBe('number');
    expect(currentYear).toBeGreaterThanOrEqual(2015);
    expect(currentYear).toBeLessThanOrEqual(2115);
});