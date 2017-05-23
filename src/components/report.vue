<template>
    <div class="Report">
        <ul>
            <li>A for HTML</li>
            <li>A for CSS</li>
            <li>A for JS</li>
            <li>B for PNG</li>
            <li>A for SVG</li>
            <li>A for Server</li>
            <li>A for Database</li>
            <li>A for Dynamic pages</li>
            <li>35 for Depth (out of 40)</li>
        </ul>
        <h2>Overview</h2>
        <p>
            A Vue.js web application. Bundled by webpack. Served by Node.js server.
            Data communication by an RPC websocket.
        </p>
        <div class="main">
            <h3>HTML</h3>
            <p>
                The HTML displayed in the web-app are written in .vue files.
                These specifiy HTML, CSS and JS for a Vue.js component.
                The .vue file is loaded into the javascript to build the website by webpack.
                The webpack vue-loader compiles the HTML into Virtual-DOM objects.
                At this step the HTML is validated, ensuring correct and well formed documents.
            </p>
            <h3>CSS</h3>
            <p>
                Similar to the HTML, the css is written in .vue files.
                This allows the styles to be scoped to particular components, thus avoiding global namespace conflicts.
                <h4>Noteworthy Features</h4>
                <ul>
                    <li>
                        <b>Transitions via Vue.js:</b> These allow for components to be animated in and out via css3 transition.
                    </li>
                    <li>
                        <b>Loader:</b> CSS animation using @keyframes.
                    </li>
                </ul>
            </p>
            <h3>JS</h3>
            <p>
                This project has allowed me to further my understanding and use of Vue.js while changing my development enviroment to webpack.
                The whole project is built using these tools.
                Vue.js is a standard client-side framework (Not for long --Link to SSR) with access to the usual client-side templating and flow control.
                While Vue.js is a lovely frontend library, with an easy to understand DSL, webpack is the true star of this project.
                Enabling features such as Babel and Hot-Reloading, webpack has made the development easier and more enjoyable.
                During development the js files are built into a bundle and served from memory. This allows for the speed of bundled applications during development.
                Hot-Reloading swaps in and out imported modules in the Client Javascript allowing for changes to the site without reloading.
                When the site is ready for production, webpack builds the files into a single minified .js entry for the website in the 'dist' directory.
            </p>
            <h3>PNG</h3>
            <p>
                I found it hard to fit PNGs into the scope of this project as SVGs are better suited for the scaling sizes of web
                and the logos created were not complex enough to warrant bitmap graphics.
                However the "travel-o" bot above serves to show my experience with PNGs and Krita.
                Importing a PNG of "A.W.E.S.O.M-O" from South Park, I edited the colors of the head and body to match the color pallet of the website.
                Additionally I added a layer on top to write over the letters, using a paint brush effect for the white and a sharpie pen for the letters.
            </p>
            <h3>SVG</h3>
            <p>
                The flag logo is designed from scratch by tracing an PNG copy.
                The SVGs are loaded into the app as HTML, this allows them to be effected by CSS rules and transformations.
                The map on the landing page is also an SVG (from wikipedia) which I edited the fill to be transparent, line width and color.
            </p>
            <h3>Server</h3>
            <p>
                The server is run using the Nodejs engine v7.10.
                The library used to handle request is Koajs, written by the express team.
                The server statically serves the "dist" folder on all request. Any 404 requests are
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    }
}
</script>
<style>
.Report {
    padding: 0px 10px;
    max-width: 900px;
    margin: 0 auto;
}

.main {
    text-align: left;
}
</style>
