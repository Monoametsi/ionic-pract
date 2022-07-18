export interface budgetItem {
    id?: number,
    type: "expense" | "income",
    description: string,
    amount: number
}