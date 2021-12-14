export function areEqualDates(d1: Date, d2: Date): boolean {
    return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
    );
}

export function testDatee() {
    console.log(new Date());
}
