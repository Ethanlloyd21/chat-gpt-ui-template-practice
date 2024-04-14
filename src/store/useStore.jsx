import { create } from "zustand";

const useStore = create((set) => ({
  //Dark or Light mode theme
  appTheme: "dark",
  setAppTheme: (value) => set({ appTheme: value }),

  //History state
  history: [
    {
      question:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
      answer: "nothing",
    },
    {
      question: "why is the sky blue?",
      answer: "nothing",
    },
  ],
  setHistory: (value) => set({ history: value }),

  //TextField user input
  userInput: "",
  setUserInput: (input) => set({ userInput: input }),

  //Arrays of conversation state
  conversation: [],
  setConversation: (value) => set({ conversation: value }),

  //loading state of the submit button
  buttonLoading: false,
  setButtonLoading: (bool) => set({ buttonLoading: bool }),
}));

export default useStore;
