# Front-end Folder Structure and Coding Guidelines ✨

This document defines a set of common coding standards that all developers would adhere to, as it is essential to maintain consistency across the code, and improve readability, We as developers spend most of our time reading code rather than writing code. Adhering to a common standard means that everyone follows the same coding style, and it becomes much easier to understand other’s code.

**For this, we tackle it via two main places** 🏇

- Folder Structuring and File naming
- Coding conventions and style guides.

The image below provides an overview of how the folder structure should be in the Front-end projects that Vyap does (*Primarily Vyap App & Vyap Admin panel)*

**Overview of the folder structure:-**

```
- src
  - utils // Utility functions that are very generic in nature
  - hooks // Custom hooks that we create
  - Pages
      - <Feature Folder>
          - __tests__ // Contains all tests related to the Feature
          - index.tsx
          - styled.ts // All the styling in this file, which uses @emotion/react
          - redux
            - slice.ts // Redux slice which deals with all the activities
          - assets // Contains all assets required by the feature
          - api // Contains the api wrappers related to the component
          - utils // Other utility functions
              - types // Contains typedefinitions required
              - data // Contains static data & enums required by the components
              - Any other utility functions
              - locales
                 - translation.json
                 - translation.en.json
          - <Component> // If there's any component present.
  - Components
      - <Component>
          <Same sub files as a feature folder>
```

> Note: The locales we don’t need to follow currently, we can have all the translations in a single file which resides in `src/i18n` folder.
> 

**Sample folder structure**

### 📃 **Pages**

Pages folder contains all the primary features, Any `tsx` file that is written should be in Pages folder, only if it is not possible to accommodate it in pages should it go to components folder, which will be explained in the components section.

The folder structuring will be as per how the features are created, it follows the same hierarchy as what is seen on the screen, this makes it easier to correlate with the application during the development phase and would allow the application to grow naturally.

**It contains the following files**

1. **__tests__ → Contains all the test files related to the feature.**
2. **assets** → Contain all the assets related to the feature, if it doesn’t have many assets, we can have everything inside the assets folder itself, but if it has different types of assets, then we need to subdivide it into images, fonts, and other respective folder names.
3. **api** → Contains API wrappers related to the particular component.
    1. mutations → contain all the mutations related to the specific feature
        1. < all the mutation files>
        2. __generated__ folder → contains the generated type definitions of the mutations
    2. queries → contain all the queries related to the specific feature
4. **redux** → Contain all the redux files related to the feature.
5. **utils** → Contain all the util files related to the feature.
    1. data.ts → contains the static data, removing the clutter away from the component, instead of storing it in a separate data file. It can also contain the enums
    2. types.ts → type definitions in the feature are declared here
    3. locales → Locales folder contains the static text in the files, used for i18n
        1. translation.json -> the base file
        2. translation.en.json -> en version
6. **Components Or Sub Features** → Can have the same structure nested.

### 🛡️ Components

This would contain the components that cannot be fit logically into a feature section.

We can have components in a specific **feature** **folder** even if it is being used by multiple other features, for example, we can have a Product Card in the Product Module, even if it is used by Place Order, Orders, etc. In this case, logically it belongs to the Product Module and is borrowed by the  other sections.

In case when the component is used by multiple other Modules/Features, and if it doesn’t logically belong to any module, ie it is a generic component, then it belongs to the components folder. For example, any UI components belong to the components folder, since it doesn’t have a direct logical relationship with the feature modules, instead, they are generic in nature. eg, Button Component, Pagination Component, etc.

*The folder structure for components also follows the same pattern as a feature module.*

### 📛 Filename casing guidelines

Certain file name guidelines are to be followed across the code-base for consistency and readability.

- All React Components (.tsx files) should have **PascalCase** ([https://wiki.c2.com/?PascalCase](https://wiki.c2.com/?PascalCase))
- all .ts & .json & other assets files should follow **camelCase**

### 💻 Github workflow

All the developers needs to work on their on feature branches and are not supposed to work on the main branches.

**The main branches are:-**

- develop -> This is the developer platform, All developers make changes in their feature branches and push the changes to this particular branch only.
- master → This is the production branch, Direct Merge to this branch is forbidden, There should only be PR merges from develop→ master

**For those who are not familiar with git workflow please refer to the following**

- [https://www.atlassian.com/git/tutorials/comparing-workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- [https://www.earthdatascience.org/courses/intro-to-earth-data-science/git-github/github-collaboration/github-for-collaboration-open-science-workflow/](https://www.earthdatascience.org/courses/intro-to-earth-data-science/git-github/github-collaboration/github-for-collaboration-open-science-workflow/)

### 📛 Feature branch naming convention

**Branch name** - topics/<name>

here the <name> , should follow the following naming convention

For more info: [https://deepsource.io/blog/git-branch-naming-conventions/](https://deepsource.io/blog/git-branch-naming-conventions/)

### 🔖 Commit guidelines

For commit guidelines we follow conventional commits, you can read more about them here → [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. **fix:** a commit of the *type* fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
2. **feat:** a commit of the *type* feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
3. **BREAKING CHANGE:** a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any *type*.
4. *types* other than fix: and feat: are allowed, for example[,](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (based on the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
5. *footers* other than BREAKING CHANGE: <description> may be provided and follow a convention similar to [git trailer format](https://git-scm.com/docs/git-interpret-trailers).

Additional types are not mandated by the Conventional Commits specification and have no implicit effect in Semantic Versioning (unless they include a BREAKING CHANGE). A scope may be provided to a commit’s type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add the ability to parse arrays.

📖 **Great reads on commit message**

- [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)
- [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)

### 📜 React & Typescript guidelines

Most of the coding guidelines are already enforced via linter, it throws linting error once it is violated, but here are some things that are not covered or cannot be enforced.

- Never add @ts-ignore or // eslint-disable-next-line react-hooks/exhaustive-deps, If there’s a warning from the linter, there’d probably be a meaning for the same, so try to work on it, only ignore if it’s absolutely necessary. [[More info]](https://typeofnan.dev/you-probably-shouldnt-ignore-react-hooks-exhaustive-deps-warnings/)
- Do not use any as the type, this is basically disabling the typescript from doing its magic, if you define something as any in an emergency situation, make sure there’s a follow-up soon to change it. [[More info]](https://thoughtbot.com/blog/typescript-stop-using-any-there-s-a-type-for-that)
- Use DRY Principle, if there’s a component that does a similar thing, try to extend that instead of copy-pasting and modifying it. [https://en.wikipedia.org/wiki/Don%27t_repeat_yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- Avoid inline CSS as and when possible. [[More info]](https://blog.logrocket.com/why-you-shouldnt-use-inline-styling-in-production-react-apps/)
- Review your code before creating a pull request. [[More info]](https://quickbirdstudios.com/blog/code-review-best-practices-guidelines/)
- Use the right variable names and the code should be self-explanatory. [[More info]](https://github.com/labs42io/clean-code-typescript#variables)
- Always write test cases for new features.
- Always destructure props [[More info]](https://www.freecodecamp.org/news/the-basics-of-destructuring-props-in-react-a196696f5477/)
- **Use only Functional components.**
- Prefer async-await over Promises or Callbacks [[More info]](https://javascript.plainenglish.io/why-i-always-prefer-async-await-72fd325792f2)
- Avoid magic numbers/strings, secret keys in code, etc at any cost. [[More info]](https://codeburst.io/software-anti-patterns-magic-numbers-7bc484f40544)
- Review the useEffect dependency array, make sure it works as intended and is not triggered unintentionally. Also make sure you pass primitive types in the dependency array, if not make sure it's memoized.
- Each useEffect, function & component should have a single responsibility. [[More info]](https://en.wikipedia.org/wiki/Single-responsibility_principle#:~:text=The%20single%2Dresponsibility%20principle%20(SRP,it%20should%20encapsulate%20that%20part.&text=Hence%2C%20each%20module%20should%20be%20responsible%20for%20each%20role.)
- Avoid writing large components like a plague. Try to restrict the Component to less than 300 LoC. If it goes beyond, split it into smaller logical units which can be reused, but only do split when necessary.
- Use CSS in javascript. use EmotionJS.
- Keep Accessibility in mind while developing and for HTML always follow semantic HTML. [[More info]](https://reactjs.org/docs/accessibility.html)
- Comment less! Make sure your code is self-explanatory [[More info]](https://towardsdatascience.com/why-good-codes-dont-need-comments-92f58de19ad2)
    - You’ll avoid a potential conflict between comment and code if you happen to alter the code at some later point in time.
    - But make sure to comment with the ticket if it’s an edge case or a hacky implementation
- When adding a new dependency, make sure you look into the cost of adding the same and the License associated with the library. You can use tools like [https://bundlephobia.com/](https://bundlephobia.com/) to check this. For UI components, do add a wrapper for the libraries, so that it’d be easier to change them in the future.
- Developers should not comment out code as it bloats programs and reduces readability. Unused code should be deleted and can be retrieved from source control history if required. [[More info]](https://rules.sonarsource.com/java/tag/unused/RSPEC-125)
- Don't modify any existing IDs or test-ids unless absolutely necessary (so integration testing is not impacted).
- Opening brackets are on the same line as the method declaration, and Use brackets for if conditions even if it’s a simple condition. [[More info]](https://rules.sonarsource.com/typescript/RSPEC-121)
- Use guard clauses to reduce nesting in conditions, Also merging collapsible if statements increase the code’s readability. [[More info]](https://wiki.c2.com/?GuardClause)
- Program defensively, handle cases where the nested values might be null, The Application should not break because one little parameter is missing. [[More info]](https://levelup.gitconnected.com/javascript-best-practices-defensive-programming-9592a9329787)
- More best practices - [https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md](https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md)

### 💡 Suggestions

- ✏ Editor → VS Code
- 🔌 Plugins in VS code
    - GitLens [[Link]](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
    - Import Cost
    - Eslint
    - DotEnv
    - vscode-styled-components
    - SCSS Formatter
    - React Snippets
    - Bracket Colorizer
- Package manager → Yarn

### 📚 Articles

1. [https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md](https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md)
2. [https://dev.to/justboris/popular-patterns-and-anti-patterns-with-react-hooks-4da2](https://dev.to/justboris/popular-patterns-and-anti-patterns-with-react-hooks-4da2)
3. [https://overreacted.io/the-elements-of-ui-engineering/](https://overreacted.io/the-elements-of-ui-engineering/)
4. [https://dennyscott.io/use-effect-dependency-array/](https://dennyscott.io/use-effect-dependency-array/)
5. [https://www.freecodecamp.org/news/10-points-to-remember-thatll-help-you-master-coding-in-reactjs-library-d0520d8c73d8/](https://www.freecodecamp.org/news/10-points-to-remember-thatll-help-you-master-coding-in-reactjs-library-d0520d8c73d8/)
6. [https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)
7. [https://overreacted.io/writing-resilient-components/](https://overreacted.io/writing-resilient-components/)
8. [https://overreacted.io/before-you-memo/](https://overreacted.io/before-you-memo/)
9. [https://flaviocopes.com/become-web-developer-2021/](https://flaviocopes.com/become-web-developer-2021/) ***(For freshers)***
10. [https://usehooks.com/](https://usehooks.com/)
11. [https://aboutmonica.com/blog/tips-for-debugging-software-like-a-detective](https://aboutmonica.com/blog/tips-for-debugging-software-like-a-detective)