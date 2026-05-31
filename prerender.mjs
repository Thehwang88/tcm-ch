// prerender.js — run: node prerender.js
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

const BASE = 'https://tcm.ch';        // prerender against live deploy
const OUT  = './prerendered';         // copy into repo root, commit, push
const WAIT_SELECTOR = '#home-content'; // adjust to an element present after render

// 1. pull all routes from your sitemap
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

const browser = await puppeteer.launch({ headless: 'new' });

for (const url of urls) {
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector(WAIT_SELECTOR, { timeout: 8000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 600)); // settle async meta/content

    const html = await page.content();

    const rel = new URL(url).pathname.replace(/^\/|\/$/g, '');
    const dir = rel === '' ? OUT : path.join(OUT, rel);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.html'), html);
    console.log('✓', url);
  } catch (e) {
    console.log('✗', url, e.message);
  } finally {
    await page.close();
  }
}
await browser.close();