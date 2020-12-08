import { useEffect, useState } from "react";
import { Fontizer } from "fontizer";
import Button from "../components/Button";

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
        <h2>Tiny React component to you manage your website's fonts display</h2>

        <Button label="On Github" />
        <Button label="On NPM" />
      </header>

      <section>
        <article>
          <header>
            <h3 className="m-0">Demo</h3>
          </header>

          <p>Click one of the button on the corners</p>
        </article>
      </section>

      <section>
        <article>
          <header>
            <h3 className="m-0">How to use it</h3>
          </header>

          <p>Install the package</p>

          <pre>
            <code>yarn add fontizer</code>
          </pre>

          <p>
            Prepare your CSS file, by adding these base values to your CSS{" "}
            <code>:root{}</code> element
          </p>
          <pre>
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

          <pre>
            <code>
              {`import { Fontizer } from "fontizer";

<Fontizer
  position="bl"
  callback={ value => console.log(\`values changed \${value}\`)}
/>`}
            </code>
          </pre>
        </article>
      </section>
      <section>
        <article>
          <header>
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
          </table>
        </article>
      </section>
      <section>
        <article>
          <header>
            <h3>A sprinkle of CSS?</h3>
          </header>
          <p>override the styles</p>

          <pre>
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
          Built by <a href="https://twitter.com/lukyvj">@LukyVj</a> code hosted
          on <a href="https://github.com/lukyvj/fontizer-site">Github</a> and
          available on <a href="https://www.npmjs.com/package/fontizer">NPM</a>
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
