
module.exports = {
    docs: [
    "doc1",
    "doc2",
    "doc3",
    {
        "type": "category",
        "label": "Parent Folder One",
        "items": [
            "folder1/doc1",
            {
                "type": "category",
                "label": "Sub Folder One",
                "items": [
                    "folder1/subfolder1/doc1",
                    "folder1/subfolder1/doc2"
                ]
            },
            {
                "type": "category",
                "label": "Sub Folder Two",
                "items": [
                    "folder1/subfolder2/doc1",
                    "folder1/subfolder2/doc2"
                ]
            }
        ]
    },
    {
        "type": "category",
        "label": "Parent Folder Two",
        "items": [
            "folder2/doc1",
            {
                "type": "category",
                "label": "Sub Folder One",
                "items": [
                    "folder2/subfolder1/doc1",
                    "folder2/subfolder1/doc2"
                ]
            },
            {
                "type": "category",
                "label": "Sub Folder Two",
                "items": [
                    "folder2/subfolder2/doc1",
                    "folder2/subfolder2/doc2"
                ]
            }
        ]
    },
    "mdx"
]
};
