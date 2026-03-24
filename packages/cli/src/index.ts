#!/usr/bin/env node
import { Command } from "commander";
import { runAssess } from "./commands/assess.js";

const program = new Command();

program
  .name("clrposture")
  .description("NIST CSF 2.0 compliance assessment for SMEs")
  .version("0.1.0");

program
  .command("assess")
  .description("Run an interactive NIST CSF 2.0 assessment")
  .option("-i, --industry <industry>", "Industry profile: fintech, healthcare, federal-contractor, dib, mssp")
  .option("-o, --output <file>", "Save results to a file (JSON or CSV)")
  .option("-f, --format <format>", "Output format: json (default) or csv")
  .action(runAssess);

program.parse();
