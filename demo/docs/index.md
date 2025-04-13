# Zeig mir den Code

Don't repeat yourself, event by documenting!

## Install

Install via NPM:

```shell
npm install zmdc
```

You can use this library as JavaScript (ESM) or Typescript. 
If you need UMD format, you can compile the TypeScript files by yourself, using your toolchain.


### ESM

```javascript
import {parseExampleFunction, showExampleCode} from './node_module/zmdc/dist/zmdc.js'
```

### TypeScript

```typescript
import {parseExampleFunction, showExampleCode} from 'node_module/zmdc/lib/zmdc.(t|j)s'
```

The extensions depend on your toolchain!

## Usage

### What you want

You have a function `formatFancy()`. 
You want to show a usage of this function in a context (left side) and the result (right side):

<div class="grid">
    <div id="fancy-demo">
        <i>JavaScript</i>
        <pre><code class="language-javascript"></code></pre>
        <i>HTML</i>
        <pre><code class="language-html"></code></pre>
    </div>
    <div>
        <i>Result:</i>
        <span id="ff-result"></span>
    </div>    
</div>

### What your don't want to do
If you have to rename the function formatFancy to formatColorful, you have to change your example code, too. 
But you don't want to also change the HTML, where you placed the example code. 
This library should do it for you.


### What you have to do

#### Step 1. Prepare your demonstration

<div id="howto-prepare-demo-function">
    Encapsulate the demo code in a function:
    <pre><code class="language-javascript"></code></pre>
    Update your HTML to let your demo function work properly.
    <pre><code class="language-html"></code></pre>
</div>

#### Step 2. Run your demonstration
Call your demo function:

<div id="howto-run-demo-function">
    <pre><code class="language-javascript"></code></pre>    
</div>

In this step you can check if your demo function work like you want.

#### Step 3. Mark necessary HTML tags in demonstration function
Before you can let this library show you demo code on DOM, you have to mark these information in your function:

<ol>
    <li>In which DOM element should the demo code be shown</li>
    <li>Which DOM elements needs the demo code to work properly</li>
</ol>

<div id="howto-mark-demo-info">
    <p>
        <i>For the 1. point:</i> A demo code-block starts with a 
        <code>// tag: DOM-id</code>
        Here ist an element with <code>id="fancy-demo"</code>.
        The element does not have to be a div, in most cases a div is fine.
    </p>
    <pre><code class="language-javascript"></code></pre>
    <p>
        The given element must contain at least two <code>code</code>-Tags with class list containing <code>language-javascript</code> and <code>language-html</code> respectively.
    </p>
    <pre><code class="language-html"></code></pre>
    <p>
        <i>For the 2. point:</i> One comment in form <code>// &lt;tag&gt;</code> for each necessary DOM-element.
        The demo function here just needs only an element with <code>id="ff-result"</code>,
        so there is only one comment.
        By this way you can directly denote the demo code, which DOM element it needs to work.
    </p>
</div>


#### Step 4. Show your demonstration

You can use this function to load your javascript file over GET:

<div id="howto-load-demo-code">
    <pre><code class="language-javascript"></code></pre>
</div>

For example:

<div id="howto-show-demo-code">
    <pre><code class="language-javascript"></code></pre>
</div>

Now the div with id="fancy-demo" has the following content:

<div id="duplicate-fancy-demo">
    <ul>
        <li>
            innerHTML of the element <code>&lt;code class="language-javascript"&gt;</code>
            <pre><code class="language-javascript nohighlight"></code></pre>
        </li>
        <li>
            innerHTML of the element <code>&lt;code class="language-html"&gt;</code>
            <pre><code class="language-html nohighlight"></code></pre>
        </li>
    </ul>
</div>

As you wish to have!

>? EXAMPLE: **Code to verify content of `ff-demo`**
> <div id="verify-contents-of-fancy-demo">
>     JavaScript:
>     <pre><code class="language-javascript"></code></pre>
>     HTML:
>     <pre><code class="language-html"></code></pre>
> </div>



<script src="lib/index.js" type="module"></script>
