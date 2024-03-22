declare global {
  declare module '*.glsl' {
    export const glslString: string;
    export default glslString;
  }
}
