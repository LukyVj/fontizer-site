import { useEffect, useState } from "react";
import { Fontizer } from "fontizer";
import Button from "../components/Button";

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="fontizer-icon va-middle"
    >
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  );
};

const App = () => {
  const [fontParam, setFontParam] = useState<any>([]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setFontParam([
        parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--base-font-size")
            .split("px")[0],
          0
        ),
        parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--base-font-weight")
            .split("px")[0],
          0
        ),
      ]);
    }
  }, []);
  return (
    <div>
      <header className="w-100p pt-48 mb-48 m-0 ta-center">
        <div>
          <h1 className="mt-0 logo d-flex ai-center jc-center">
            <span>F</span>
            <span>o</span>
            <span>n</span>
            <span>t</span>
            <span>i</span>
            <span>z</span>
            <span>e</span>
            <span>r</span>
          </h1>
        </div>
        <h2>Tiny React component to you manage your website's fonts display</h2>
        <Button
          label="On Github"
          href="https://github.com/lukyvj/fontizer-site"
        />{" "}
        <Button label="On NPM" href="https://www.npmjs.com/package/fontizer" />
      </header>

      <section>
        <article>
          <header>
            <h3 className="m-0">Demo</h3>
          </header>

          <p>
            Click one of the <Icon /> button on the corners
          </p>
        </article>
      </section>

      <section>
        <article>
          <header>
            <h3 className="m-0">How to use it</h3>
          </header>

          <p>Install the package</p>

          <pre className="color-theme">
            <code>yarn add fontizer</code>
          </pre>

          <p>
            Prepare your CSS file, by adding these base values to your CSS{" "}
            <code>:root{}</code> element
          </p>
          <pre className="color-theme">
            <code>
              --base-font-size: {fontParam[0]}px;
              <br />
              --base-font-weight: {fontParam[1]};
            </code>
          </pre>

          <p>
            Then load Fontizer on your page, it can take 2 props, the{" "}
            <strong>position</strong> one that will position it. And a callback
            function that returns the new values in an array{" "}
            <code>[16, 300]</code>
          </p>

          <pre className="color-theme">
            <code>
              {`import { Fontizer } from "fontizer";

<Fontizer
  position="bl"
  callback={ value => console.log(\`values changed \${value}\`)}
  variables={{size: '--foo-bar-size', weight: '--foo-bar-weight'}}
/>`}
            </code>
          </pre>
        </article>
      </section>
      <section>
        <article>
          <header className="mb-24">
            <h3 className="m-0">Props table</h3>
          </header>

          <table cellPadding={8}>
            <tr>
              {["prop", "type", "value", "default", "description"].map(
                (header) => (
                  <th className="bgc-themeDark color-white bdc-themeDark">
                    <h4 className="tt-capitalize p-0 m-0">{header}</h4>
                  </th>
                )
              )}
            </tr>
            <tr>
              {[
                "position",
                "string",
                "'bl' | 'br' | 'tl' | 'tr' ",
                "bl",
                "corner coordinates to position your Fontizer button/panel",
              ].map((value) => (
                <th data-prop="position">
                  <p>{value}</p>
                </th>
              ))}
            </tr>
            <tr>
              {[
                "callback",
                "Function",
                "any javascript function",
                "null",
                "Pass a function using the callback returned value, happen on each updates",
              ].map((value) => (
                <th data-prop="callback">
                  <p>{value}</p>
                </th>
              ))}
            </tr>
            <tr>
              {[
                "variables",
                "object",
                "{size: '--foo', weight: '--bar'}",
                "--base-font-size & --base-font-weight",
                "If needed, you can override the default variables name.",
              ].map((value) => (
                <th data-prop="variables">
                  <p>{value}</p>
                </th>
              ))}
            </tr>
          </table>
        </article>
      </section>
      <section>
        <article>
          <header>
            <h3>A sprinkle of CSS?</h3>
          </header>
          <p>override the styles</p>

          <pre className="color-theme">
            <code>
              {`.fontizer-wrapper {}
.fontizer-button {}
.fontizer-icon {}
.fontizer-panel {}`}
            </code>
          </pre>
        </article>
      </section>

      <footer className="pv-24 ta-center">
        <p>
          Built by{" "}
          <a
            href="https://twitter.com/lukyvj"
            className="fw-bold color-current"
          >
            @LukyVj
          </a>{" "}
          code hosted on{" "}
          <a
            href="https://github.com/lukyvj/fontizer-site"
            className="fw-bold color-current"
          >
            Github
          </a>{" "}
          and available on{" "}
          <a
            href="https://www.npmjs.com/package/fontizer"
            className="fw-bold color-current"
          >
            NPM
          </a>
        </p>
        <p>
          <Icon /> from{" "}
          <a href="https://feathericons.com/" className="fw-bold color-current">
            Feather Icons
          </a>
        </p>
        <p>
          Hosted on{" "}
          <a href="https://vercel.com" className="fw-bold color-current">
            Vercel
          </a>
        </p>
      </footer>
      {["bl", "br", "tl", "tr"].map((pos) => (
        <Fontizer
          key={pos}
          position={pos as "bl" | "br" | "tl" | "tr"}
          callback={setFontParam}
        />
      ))}
    </div>
  );
};

export default App;
