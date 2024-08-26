export default function skipSpace(program) {
  const skipMatch = program.match(/^(\s|#.*)*/);
  return program.slice(skipMatch[0].length);
}
