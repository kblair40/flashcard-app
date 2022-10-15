export const quillSettings = {
  modules: {
    toolbar: [
      [{ size: ["medium", "small", "large"] }],
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image"],
    ],
  },
};

export const categories = [
  {
    label: "Finance",
    value: "finance",
  },
  {
    label: "Computer Science",
    value: "computer science",
  },
  {
    label: "Programming",
    value: "programming",
  },
  {
    label: "History",
    value: "history",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "Biology",
    value: "biology",
  },
  {
    label: "Chemistry",
    value: "chemistry",
  },
];
