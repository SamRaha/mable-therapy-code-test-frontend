const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    } else if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}k`;
    } else {
        return num.toString();
    }
};

export default formatLargeNumber;
