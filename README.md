# Automated-Order-Management-Omnichannel-CRM-Sync-System
An enterprise-grade Google Apps Script solution designed to automate multi-channel e-commerce order processing. It handles background currency exchange rate lookups using a reliable external API, tracks stock levels against an inventory backend, dynamically generates unified sequential sequence IDs per brand, 

# Enterprise Staging Engine & Operational Gatekeeper Control Suite

A performance-tuned, secure, and fully generalized Google Apps Script automation engine. It architecture establishes resilient data clearing houses between messy transactional ingestion surfaces (`Staging_Orders`) and your persistent master relational database records (`Master_Dataset`).

## ⚙️ Core Capabilities

*   **Dynamic Matrix Validation:** Runs real-time in-memory tracking evaluation across input matrices to highlight anomalies instantly while protecting systemic data types.
*   **API Telemetry Rate-Fetch Engine:** Leverages a highly localized caching pool to make asynchronous `UrlFetchApp` API requests, pulling structural pricing multipliers to convert multi-currency orders cleanly.
*   **O(1) Sequential Index Generator:** Employs advanced grouping logic to dynamically sequence transaction alphanumeric IDs based on division classifications without data race conditions or numbering gaps.
*   **Modal Intercept Gateway:** Intercepts row operations to construct customizable UI popups that prevent partial pushes, duplicate mutations, or dirty parameters from bleeding into master records.

---

## 🗆 Relational Data Schema Dependencies

Ensure your workbook environment contains the following matching architectural configurations. Columns are evaluated space and case-insensitively via index vectors:

### 1. `Staging_Orders` & `Master_Dataset`
*   **Data Coordinates:** Data boundaries must begin precisely on Row Index `3` (Row `2` strictly reserved for field descriptions).
*   **Key Tracking Structures:** Core attributes include `Source Record ID`, `Organizational Component Code`, `SKU`, `Regional Zone Profile`, and `Monetary Label`.

### 2. `System_Config`
*   **Column E (`Brand Name / Group Key`):** Division tokens mapping against `Organizational Component Code`.
*   **Column F (`Prefix Token Mapping`):** Unique character strings used to seed sequence numbering engines (e.g., `SYS`, `NODE`).
*   **Column G (`High Watermark Tracker`):** Integers storing current serial progression milestones safely.

### 3. `Asset_Pricing_Matrix`
*   Maps standard pricing data. Column A references global fulfillment values; Column B matches entry SKUs; Column C maintains baseline cost valuations.

### 4. `Warehouse_Inventory`
*   Maintains structural item nomenclature (Column C) alongside atomic asset balance capacities (Column D) for strict volume evaluations.

---

## 🚀 Environment Initialization

1. Open your target spreadsheet dashboard workspace.
2. Launch the script development IDE via **Extensions** ──► **Apps Script**.
3. Replace existing script files with the code block provided in `staging_control.gs`.
4. Click the save icon utility to store workspace configurations.
5. Reload your sheet window. Select `⚙️ Boot Core Script Environments` from the newly generated `📦 Pipeline Staging Operator` workspace menu menu to activate structural listeners instantly.
