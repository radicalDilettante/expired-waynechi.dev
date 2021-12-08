import Command from ".";
import getBlogList from "../get_list";

describe("Command", () => {
  let contentsContainer: HTMLDivElement;
  let cliCommand: Command;

  beforeEach(() => {
    contentsContainer = document.createElement("div");
    cliCommand = new Command(contentsContainer, getBlogList());
  });
  describe("clear", () => {
    it("clears contents", () => {
      cliCommand.help();
      expect(contentsContainer.children.length).not.toBe(0);
      cliCommand.clear();
      expect(contentsContainer.children.length).toBe(0);
    });
  });

  describe("help", () => {
    it("gets help for commands", () => {
      cliCommand.help();
      expect(contentsContainer.getElementsByTagName("p")[0].innerText).toBe(
        "These are commands used in WayneChoi.dev:"
      );
      expect(contentsContainer.getElementsByTagName("tr").length).toBe(7);
      expect(contentsContainer.getElementsByTagName("td").length).toBe(21);
    });
  });

  describe("ls", () => {
    it("prints a list of files and subdirectories of main dir", () => {
      cliCommand.ls();
      expect(contentsContainer.getElementsByTagName("span")[0].innerText).toBe(
        "blog"
      );
      expect(contentsContainer.getElementsByTagName("span")[1].innerText).toBe(
        "about.txt"
      );
    });
    it("prints a list of files and subdirectories of blog dir", () => {
      cliCommand.cd("cd blog");
      cliCommand.ls();
      expect(contentsContainer.getElementsByTagName("tr").length).toBe(5);
      expect(contentsContainer.getElementsByTagName("td").length).toBe(15);
    });
  });

  describe("cd", () => {
    it("changes directory", () => {
      expect(cliCommand.curDir).toBe("");
      cliCommand.cd("cd blog");
      expect(cliCommand.curDir).toBe("/blog");
      cliCommand.cd("cd ..");
      expect(cliCommand.curDir).toBe("");
    });

    it("gets error message with wrong route in main dir", () => {
      cliCommand.cd("cd wrong");
      expect(
        contentsContainer.getElementsByTagName("p")[0].innerText
      ).toContain("Cannot find path");
    });

    it("gets error message with wrong route in blog dir", () => {
      cliCommand.cd("cd blog");
      expect(cliCommand.curDir).toBe("/blog");
      cliCommand.cd("cd wrong");
      expect(
        contentsContainer.getElementsByTagName("p")[0].innerText
      ).toContain("Cannot find path");
    });
  });

  describe("cat", () => {
    it("displays contents in main dir", () => {
      cliCommand.cat("cat about.txt");
      expect(contentsContainer.textContent).toContain("Hi I am Wayne.");
    });
  });

  describe("render", () => {
    it("renders message", () => {
      cliCommand.render("hello world");
      expect(contentsContainer.getElementsByTagName("p")[0].innerText).toBe(
        "hello world"
      );
    });
  });

  describe("renderErrorMsg", () => {
    it("renders error message", () => {
      cliCommand.renderErrorMsg("errorMsg");
      expect(contentsContainer.getElementsByTagName("p")[0].innerText).toBe(
        "$ errorMsg: command not found. See 'help'."
      );
    });
  });
});
