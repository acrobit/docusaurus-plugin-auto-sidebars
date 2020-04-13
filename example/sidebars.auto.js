
module.exports = {
    docs: [
    "doc1",
    "doc2",
    "doc3",
    {
        "type": "category",
        "label": "fodler1",
        "items": [
            "fodler1/doc1",
            {
                "type": "category",
                "label": "subfolder11",
                "items": [
                    "fodler1/subfolder11/doc1"
                ]
            }
        ]
    },
    "mdx"
]
};
