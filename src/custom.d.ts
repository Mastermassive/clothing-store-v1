declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React,React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}