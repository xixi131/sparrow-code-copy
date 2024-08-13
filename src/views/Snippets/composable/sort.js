
export const timeSort = (comments) => {
    return comments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}

