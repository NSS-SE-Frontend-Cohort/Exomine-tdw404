export const formatPrice = (s) => {
    return s.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}