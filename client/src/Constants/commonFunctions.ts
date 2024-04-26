export function currencyFormatter(number: number): string {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    });
    return formatter.format(number);
}