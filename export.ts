import { writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { glob } from "glob";
import { mkdir } from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { SKIP, visit } from "unist-util-visit";
import { Root } from "mdast";

const OUTPUT_DIR = "md";


// Transform mdx, removing or simplifying parts of the tree
function mdxToMd() {
  const toRemove = ["mdxjsEsm", "mdxJsxFlowElement"];
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (node.type === "mdxJsxFlowElement") {
        console.log(node);
      }
      if (toRemove.includes(node.type) && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    });
  };
}

async function convertMdxToMd(
  mdxPath: string,
  outputPath: string
): Promise<void> {
  // Read the MDX file
  const mdxContent = await readFile(mdxPath, "utf-8");

  // Process the MDX content
  const markdown = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(mdxToMd)
    .use(remarkStringify)
    .process(mdxContent);

  // Create directory if it doesn't exist
  await mkdir(dirname(outputPath), { recursive: true });

  // Write the markdown output
  await writeFile(outputPath, String(markdown));
}

async function main() {
  const errors = [];
  // Find all MDX files in the project
  const mdxFiles = await glob("**/*.mdx", {
    ignore: ["node_modules/**", ".next/**", "out/**", `${OUTPUT_DIR}/**`],
  });

  if (mdxFiles.length === 0) {
    console.log("No MDX files found in the project.");
    return;
  }

  // Create the output directory if it doesn't exist
  await mkdir(OUTPUT_DIR, { recursive: true });

  let index = 0;
  for (const mdxPath of mdxFiles) {
    console.log(
      `Converting ${index + 1} of ${mdxFiles.length} files: ${mdxPath}`
    );

    // Create the output path in the output directory while preserving the directory structure
    const relativePath = mdxPath.replace(/\.mdx$/, ".md");
    const outputPath = join(OUTPUT_DIR, relativePath);

    try {
      await convertMdxToMd(mdxPath, outputPath);
    } catch (e) {
      errors.push({
        file: mdxPath,
        error: e,
      });
    }

    console.log(`📝 Converted ${mdxPath} -> ${outputPath}`);

    index++;
  }

  console.log(
    `\n✨ Converted ${mdxFiles.length - errors.length} of ${mdxFiles.length
    } MDX files to MD format in ${OUTPUT_DIR}/`
  );

  errors.forEach((error) => {
    console.error(`❌ ${error.file}`);
    console.error(error.error);
  });
}

main().catch(console.error);
