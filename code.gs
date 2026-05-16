// ==========================================================================================
// 📋 MENU: Create User Interface Menu Components
// ==========================================================================================
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu("🚀 Push Operations")
    .addItem("📤 Push Staging → Master Dataset", "pushStagingToMaster")
    .addToUi();

  ui.createMenu("⚙️ Management Tools")
    .addItem("🔄 Run Full Database Sync", "runIncompleteSync")
    .addSeparator()
    .addItem("💱 Update Live Exchange Rates Only", "updateRatesAndBaseCurrency")
    .addItem("📦 Update Cost Variables Only", "updateProductCostFromSheet")
    .addSeparator()
    .addItem("🔢 Sync Highest Sequence Values", "syncLastMaxFromMaster")
    .addToUi();
}

// ==========================================================================================
// 🛠️ HELPER: Dynamic Column Index Locator (1-Based)
// ==========================================================================================
function getColIdx(headers, possibleNames) {
  const lowerHeaders = headers.map((h) =>
    h.toString().trim().toLowerCase().replace(/_/g, " "),
  );
  for (let name of possibleNames) {
    const cleanName = name.toLowerCase().replace(/_/g, " ");
    const idx = lowerHeaders.indexOf(cleanName);
    if (idx !== -1) return idx + 1;
  }
  return 0;
}

// ==========================================================================================
// 🛠️ LOGGING HELPERS: Manipulate Array-Based In-Cell Error Flags
// ==========================================================================================
function addError(rowErrors, msg) {
  if (msg && msg.trim() && !rowErrors.includes(msg.trim())) {
    rowErrors.push(msg.trim());
  }
  return rowErrors;
}

function removeError(rowErrors, msg) {
  if (msg && msg.trim()) {
    const idx = rowErrors.indexOf(msg.trim());
    if (idx !== -1) {
      rowErrors.splice(idx, 1);
    }
  }
  return rowErrors;
}

// ==========================================================================================
// 🛠️ DATA LOOKUP: Query Asset Pricing Structures via SKU Matrix
// ==========================================================================================
function lookupProductCost(sku, productCostSheet) {
  if (!productCostSheet || !sku) return null;

  const costLastRow = productCostSheet.getLastRow();
  if (costLastRow < 2) return null;

  const costData = productCostSheet
    .getRange(2, 1, costLastRow - 1, 3)
    .getValues();

  for (let i = 0; i < costData.length; i++) {
    const assetSku = (costData[i][1] || "").toString().trim();
    if (assetSku.toLowerCase() === sku.toLowerCase()) {
      return {
        fulfillmentSku: (costData[i][0] || "").toString().trim(),
        productCost: costData[i][2],
      };
    }
  }
  return null;
}

// ==========================================================================================
// 🛠️ WAREHOUSE AUDIT: Validate Storage Levels
// ==========================================================================================
function checkInventory(fulfillmentSku, inventorySheet) {
  if (!inventorySheet || !fulfillmentSku) return null;

  const invLastRow = inventorySheet.getLastRow();
  if (invLastRow < 2) return null;

  const invData = inventorySheet.getRange(2, 1, invLastRow - 1, 4).getValues();

  for (let i = 0; i < invData.length; i++) {
    const targetSku = (invData[i][0] || "").toString().trim();
    if (targetSku.toLowerCase() === fulfillmentSku.toLowerCase()) {
      const stock = parseFloat(invData[i][3]) || 0;
      const errors = [];

      if (stock <= 0) {
        addError(errors, "Out of Stock");
      }
      return { errors: errors, stock: stock };
    }
  }
  return null;
}

// ==========================================================================================
// 🛠️ GUI FEEDBACK: Write Errors and Formats Cell Blocks
// ==========================================================================================
function updateErrorLog(sheet, row, errorLogCol, newErrors) {
  if (errorLogCol <= 0) return;

  const errorCell = sheet.getRange(row, errorLogCol);
  const existingText = (errorCell.getValue() || "").toString().trim();

  const existingErrors = existingText
    .split("|")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);

  const dynamicErrors = [
    "Item Cost Missing",
    "Fulfillment SKU Missing",
    "Out of Stock",
    "Allocation Capacity Breached",
    "Invalid Segment Classification",
  ];

  const filteredExisting = existingErrors.filter(
    (e) => !dynamicErrors.includes(e),
  );

  const allErrors = [...filteredExisting, ...newErrors];
  const uniqueErrors = [...new Set(allErrors)];

  if (uniqueErrors.length > 0) {
    errorCell.setValue(uniqueErrors.join(" | "));
    errorCell.setBackground("#ffcccc"); 
  } else {
    errorCell.setValue("");
    errorCell.setBackground("#ffffff"); 
  }
}

// ==========================================================================================
// 🛠️ ALIGNMENT MAPPER: Map Source Relational Columns to Master Datasets
// ==========================================================================================
function getEquivalentHeaderIndex(targetHeader, sourceHeaders) {
  const target = targetHeader.toString().trim().toLowerCase().replace(/_/g, " ");
  const sources = sourceHeaders.map((h) => h.toString().trim().toLowerCase().replace(/_/g, " "));

  let idx = sources.indexOf(target);
  if (idx !== -1) return idx;

  const synonyms = {
    "source record id": "transactionid",
    "fulfillment date": "delivery timeline date",
    "internal system identifier": "system index group",
    "segment category": "classification index", 
    "logistics overhead value": "base line shipping fee",
    "base localized currency": "exchange value evaluation multiplier",
    "computed value limit": "max balance calculation",
  };

  if (synonyms[target] && sources.indexOf(synonyms[target]) !== -1) {
    return sources.indexOf(synonyms[target]);
  }

  const strippedTarget = target.replace(/\s/g, "");
  idx = sources.findIndex((s) => s.replace(/\s/g, "") === strippedTarget);
  return idx !== -1 ? idx : -1;
}

// ==========================================================================================
// 🛠️ DATA CONSTRAINT: Check Non-Mandatory Parameters
// ==========================================================================================
function isOptionalField(header) {
  const h = header.toString().trim().toLowerCase().replace(/_/g, " ");
  const optionals = [
    "fulfillment status", "remittance indicator", "internal comments", "telemetry contact", 
    "visual representation link", "logistics operator label", "carrier serial tag", 
    "operational state flags", "logistics pricing allocation", "external mapping endpoint", 
    "revised route identity", "conversion coefficient value", "normalized currency conversion", 
    "logistics surcharge offset", "asset cost standard", "projected system liability", 
    "realized system transaction cost", "calculated margin high watermark", "realized net returns", 
    "arbitration claim index", "system structural health overview", "action mitigation steps", 
    "organizational component code", "base local calculation index", "transaction annotation details",
  ];
  return optionals.includes(h);
}

// ==========================================================================================
// 🛠️ FORMAT: Standard String Transformations
// ==========================================================================================
function formatTitleCase(text) {
  if (!text) return "";
  return text
    .toString()
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ==========================================================================================
// 🛠️ COMPLIANCE: Verify Input Segments Against Config Control Sheets
// ==========================================================================================
function validateCategory(category, configSheet) {
  if (!configSheet || !category) return false;

  const configLastRow = configSheet.getLastRow();
  if (configLastRow < 2) return false;

  const headers = configSheet.getRange(1, 1, 1, configSheet.getLastColumn()).getValues()[0];
  const categoryCol = getColIdx(headers, ["Segment Category", "CLASSIFICATION_INDEX", "Category"]);

  if (categoryCol <= 0) return false;

  const categoryData = configSheet.getRange(2, categoryCol, configLastRow - 1, 1).getValues();
  const categoryLower = category.toString().trim().toLowerCase();

  for (let i = 0; i < categoryData.length; i++) {
    const configCat = (categoryData[i][0] || "").toString().trim().toLowerCase();
    if (configCat === categoryLower) return true;
  }
  return false;
}

// ==========================================================================================
// 🛠️ HISTORICAL AUDIT: Check Legacy Mappings
// ==========================================================================================
function getInternalSystemId(sourceRecordId, sheet) {
  if (!sheet || !sourceRecordId) return null;

  const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const sourceCol = getColIdx(headers, ["Source Record ID", "TRANSACTION_ID", "PortalOrderID"]);
  const internalCol = getColIdx(headers, ["Internal System Identifier", "SYSTEM_INDEX_GROUP", "Internal OrderNo"]);

  if (sourceCol <= 0 || internalCol <= 0) return null;

  const startRow = 3;
  const lastRow = sheet.getLastRow();
  if (lastRow < startRow) return null;

  const data = sheet.getRange(startRow, 1, lastRow - startRow + 1, sheet.getLastColumn()).getValues();

  for (let i = 0; i < data.length; i++) {
    const recordId = (data[i][sourceCol - 1] || "").toString().trim();
    if (recordId.toLowerCase() === sourceRecordId.toLowerCase()) {
      const internalId = (data[i][internalCol - 1] || "").toString().trim();
      if (internalId) return internalId;
    }
  }
  return null;
}

// ==========================================================================================
// 🚀 Orchestrator: Master Aggregation Sync (API Exchange and Variable Cost Compiling)
// ==========================================================================================
function runIncompleteSync() {
  updateRatesAndBaseCurrency();
  updateProductCostFromSheet();
  SpreadsheetApp.getUi().alert(
    "✅ Master Sync Protocols Executed!\n\n• Currency conversion frameworks recalculated.\n• Warehouse variable cost allocations mapped.",
  );
}

// ==========================================================================================
// 💱 ASYNC TELEMETRY: Fetch Third-Party API Exchange Coordinates
// ==========================================================================================
function updateRatesAndBaseCurrency() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Staging_Orders");
  if (!sheet) return;

  const startRow = 3;
  const lastRow = sheet.getLastRow();
  if (lastRow < startRow) return;

  const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];

  const currencyCol = getColIdx(headers, ["Currency", "CURRENCY"]);
  const priceCol = getColIdx(headers, ["Stated Price", "TRANSACTION_PRICE", "Price"]);
  const convCol = getColIdx(headers, ["Conversion Coefficient Value", "BASE_LOCAL_CALCULATION_INDEX", "INR"]);
  const normalizedCol = getColIdx(headers, ["Normalized Currency Conversion", "PRICE_IN_INR"]);

  if (!currencyCol || !priceCol || !convCol || !normalizedCol) {
    console.log("Required currency metric matrices are structural outliers.");
    return;
  }

  const currencyValues = sheet.getRange(startRow, currencyCol, lastRow - 2, 1).getValues();
  const priceValues = sheet.getRange(startRow, priceCol, lastRow - 2, 1).getValues();

  let rates = {};

  try {
    // Generalized Non-Identifiable Third-Party Financial Endpoint
    const url = "https://open.er-api.com/v6/latest/INR"; 
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const data = JSON.parse(response.getContentText());

    if (data && data.rates) {
      rates = data.rates;
    } else {
      throw new Error("API Schema Payload Mismatch");
    }
  } catch (e) {
    console.log("Telemetry Extraction Failure on Currency Rates: " + e);
    return;
  }

  const conversionRates = [];
  const normalizedPrices = [];

  for (let i = 0; i < currencyValues.length; i++) {
    const currency = (currencyValues[i][0] || "").toString().trim().toUpperCase();
    const price = parseFloat(priceValues[i][0]);
    let rate = "";

    if (!currency) {
      conversionRates.push([""]);
      normalizedPrices.push([""]);
      continue;
    }

    if (currency === "INR") {
      rate = 1;
    } else if (rates[currency]) {
      rate = 1 / rates[currency];
    }

    conversionRates.push([rate]);
    if (!isNaN(price) && rate !== "") {
      normalizedPrices.push([price * rate]);
    } else {
      normalizedPrices.push([""]);
    }
  }

  sheet.getRange(startRow, convCol, conversionRates.length, 1).setValues(conversionRates);
  sheet.getRange(startRow, normalizedCol, normalizedPrices.length, 1).setValues(normalizedPrices);

  console.log("✅ Valuation matrices standardized successfully.");
}

// ==========================================================================================
// 🖼️ RENDERING: Append Dynamic Embedded UI Formulas
// ==========================================================================================
function applyVisualFormulasToMaster(startRow, numRows) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Master_Dataset");
  if (!sheet) return;
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(2, 1, 1, lastCol).getValues()[0];

  const urlCol = getColIdx(headers, ["Visual Representation Link", "IMAGE_URL"]);
  const viewportCol = getColIdx(headers, ["Render Frame", "Image", "IMAGE"]);

  if (!urlCol || !viewportCol) return;

  const targetUrls = sheet.getRange(startRow, urlCol, numRows, 1).getValues();

  const formulas = targetUrls.map((row, i) => {
    const url = (row[0] || "").toString().trim();
    if (!url) return [""];

    const cellRef = sheet.getRange(startRow + i, urlCol).getA1Notation();
    return [`=IMAGE(${cellRef})`];
  });

  sheet.getRange(startRow, viewportCol, numRows, 1).setFormulas(formulas);
}

// ==========================================================================================
// 📦 SYNCHRONIZATION: Update System Variables Across Worksheets
// ==========================================================================================
function updateProductCostFromSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orderSheet = ss.getSheetByName("Master_Dataset");
  const costSheet = ss.getSheetByName("Asset_Pricing_Matrix");
  const inventorySheet = ss.getSheetByName("Warehouse_Inventory");

  if (!orderSheet || !costSheet) return;

  const startRow = 3;
  const orderLastRow = orderSheet.getLastRow();
  const orderLastCol = orderSheet.getLastColumn();

  if (orderLastRow < startRow) return;

  const headers = orderSheet.getRange(2, 1, 1, orderLastCol).getValues()[0];
  const skuCol = getColIdx(headers, ["SKU"]);
  const costAllocationCol = getColIdx(headers, ["Asset Cost Standard", "PRODUCT_COST"]);
  const errorLogCol = getColIdx(headers, ["System Structural Health Overview", "Error Logs", "what to fix"]);

  if (!skuCol || !costAllocationCol) {
    console.log("❌ Positional vector failure for asset definition lookups.");
    return;
  }

  const skuData = orderSheet.getRange(startRow, skuCol, orderLastRow - 2, 1).getValues();
  const output = [];
  const errorOutput = [];
  const bgColors = [];
  let executionCount = 0;

  for (let i = 0; i < skuData.length; i++) {
    const sku = (skuData[i][0] || "").toString().trim();
    const rowErrors = [];

    if (!sku) {
      output.push([""]);
      errorOutput.push([""]);
      bgColors.push(["#ffffff"]);
    } else {
      const costResult = lookupProductCost(sku, costSheet);

      if (!costResult) {
        output.push([""]);
        addError(rowErrors, "Item Cost Missing");
        errorOutput.push([rowErrors.join(" | ")]);
        bgColors.push([rowErrors.length > 0 ? "#ffcccc" : "#ffffff"]);
      } else {
        output.push([costResult.productCost || ""]);
        executionCount++;

        if (inventorySheet) {
          const invResult = checkInventory(costResult.fulfillmentSku, inventorySheet);

          if (!invResult) {
            addError(rowErrors, "Fulfillment SKU Missing");
          } else if (invResult.errors.length > 0) {
            rowErrors.push(...invResult.errors);
          }
        }

        errorOutput.push([rowErrors.length > 0 ? rowErrors.join(" | ") : ""]);
        bgColors.push([rowErrors.length > 0 ? "#ffcccc" : "#ffffff"]);
      }
    }
  }

  orderSheet.getRange(startRow, costAllocationCol, output.length, 1).setValues(output);
  if (errorLogCol > 0) {
    orderSheet.getRange(startRow, errorLogCol, errorOutput.length, 1).setValues(errorOutput);
    orderSheet.getRange(startRow, errorLogCol, bgColors.length, 1).setBackgrounds(bgColors);
  }

  console.log("✅ Component cost arrays mapped perfectly. Vectors parsed: " + executionCount);
}

// ==========================================================================================
// 🔄 UNIFIED EVENT ROUTER: Real-time Multi-sheet Context Validation
// ==========================================================================================
function onEdit(e) {
  if (!e) return;

  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  const activeSheets = ["Master_Dataset", "Staging_Orders"];
  if (!activeSheets.includes(sheetName)) return;
  if (row <= 2) return; 

  const ss = e.source;
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(2, 1, 1, lastCol).getValues()[0];

  const flagColor = "#ff0000";
  const passColor = "#ffffff";

  // ==========================================================================================
  // STAGING FLOW LOGIC
  // ==========================================================================================
  if (sheetName === "Staging_Orders") {
    const sourceRecordCol = getColIdx(headers, ["Source Record ID", "TRANSACTION_ID", "PortalOrderID"]);
    const executionTimelineCol = getColIdx(headers, ["Fulfillment Date", "DELIVERY_PICKUP_DATE"]);

    if (col === sourceRecordCol && sourceRecordCol > 0) {
      const numEditedRows = e.range.getNumRows();
      const startR = row;

      const range = sheet.getRange(startR, 1, numEditedRows, headers.length);
      const values = range.getValues();
      const backgrounds = range.getBackgrounds();

      const timelineUpdates = [];
      let executionTimelineOverride = false;

      for (let r = 0; r < numEditedRows; r++) {
        const entryId = (values[r][sourceRecordCol - 1] || "").toString().trim();

        if (entryId) {
          if (executionTimelineCol > 0) {
            const timeVal = values[r][executionTimelineCol - 1];
            if (!timeVal) {
              timelineUpdates.push(["Queue Allocation Pending"]);
              executionTimelineOverride = true;
            } else {
              timelineUpdates.push([timeVal]);
            }
          }

          for (let c = 0; c < headers.length; c++) {
            if (!isOptionalField(headers[c])) {
              const checkVal = (values[r][c] || "").toString().trim();
              if (c === executionTimelineCol - 1 && executionTimelineOverride) {
                backgrounds[r][c] = passColor;
              } else {
                backgrounds[r][c] = checkVal === "" ? flagColor : passColor;
              }
            } else {
              backgrounds[r][c] = passColor;
            }
          }
        } else {
          if (executionTimelineCol > 0) timelineUpdates.push([""]);
          for (let c = 0; c < headers.length; c++) backgrounds[r][c] = passColor;
        }
      }

      if (executionTimelineOverride && executionTimelineCol > 0) {
        sheet.getRange(startR, executionTimelineCol, numEditedRows, 1).setValues(timelineUpdates);
      }
      range.setBackgrounds(backgrounds);
    } else {
      const parentRecordId = (sheet.getRange(row, sourceRecordCol).getValue() || "").toString().trim();
      if (parentRecordId) {
        const contextHeader = headers[col - 1];
        if (contextHeader) {
          const targetedCell = sheet.getRange(row, col);
          const evaluationValue = (targetedCell.getValue() || "").toString().trim();
          if (!isOptionalField(contextHeader)) {
            targetedCell.setBackground(evaluationValue === "" ? flagColor : passColor);
          } else {
            targetedCell.setBackground(passColor);
          }
        }
      }
    }

    // ==========================================================================================
    // ENHANCED MATRIX SEQUENCER
    // ==========================================================================================
    const organizationalClassCol = getColIdx(headers, ["Organizational Component Code", "BRAND_NAME", "Brand Name"]);
    const uniqueIdentityIndexCol = getColIdx(headers, ["Internal System Identifier", "INTERNAL_ORDERNO", "Internal OrderNo"]);
    const subscriberIdentityCol = getColIdx(headers, ["Subscriber Name", "FULLNAME", "Fullname"]);
    const intakeChannelCol = getColIdx(headers, ["Distribution Point", "SALES_CHANNEL", "Sales Channel"]);
    const epochDateCol = getColIdx(headers, ["Origin Epoch Date", "PURCHASE_DATE", "Purchase Date"]);

    const transactionLeftBound = e.range.getColumn();
    const transactionRightBound = transactionLeftBound + e.range.getNumColumns() - 1;

    const constraintTriggerEvaluator = (targetColumnIndex) =>
      targetColumnIndex > 0 && targetColumnIndex >= transactionLeftBound && targetColumnIndex <= transactionRightBound;

    const evaluationVectorPassed =
      constraintTriggerEvaluator(organizationalClassCol) ||
      constraintTriggerEvaluator(sourceRecordCol) ||
      constraintTriggerEvaluator(subscriberIdentityCol) ||
      constraintTriggerEvaluator(intakeChannelCol) ||
      constraintTriggerEvaluator(epochDateCol);

    const identityVectorAltered = constraintTriggerEvaluator(uniqueIdentityIndexCol);

    if (evaluationVectorPassed && organizationalClassCol > 0 && sourceRecordCol > 0) {
      const scopeLength = e.range.getNumRows();
      generateInternalSystemIdFast(ss, sheet, row, scopeLength, headers);
    } else if (identityVectorAltered && !evaluationVectorPassed) {
      recalcInternalSystemIndices(ss, sheet, row, headers);
    }
  }

  // ==========================================================================================
  // GENERALIZED REAL-TIME CALCULATION PIPELINES
  // ==========================================================================================
  const skuCol = getColIdx(headers, ["SKU"]);
  const assetCostCol = getColIdx(headers, ["Asset Cost Standard", "PRODUCT_COST"]);
  const geographyCol = getColIdx(headers, ["Regional Zone Profile", "COUNTRY", "Country"]);
  const visualUrlCol = getColIdx(headers, ["Visual Representation Link", "IMAGE_URL"]);
  const frameRenderCol = getColIdx(headers, ["Render Frame", "IMAGE", "Image"]);
  const operationalFreightCol = getColIdx(headers, ["Logistics Overhead Value", "SHIPPING_CHARGE", "Shipping Charge Product"]);
  const monetaryLabelCol = getColIdx(headers, ["Base Unit Classification", "CURRENCY", "Currency"]);
  const currencyPriceCol = getColIdx(headers, ["Stated Price", "Price", "CURRENCY_PRICE"]);
  const standardRatioCol = getColIdx(headers, ["Conversion Coefficient Value", "INR", "Conversion Rate"]);
  const localizedNormalizationCol = getColIdx(headers, ["Normalized Currency Conversion", "PRICE_IN_INR"]);
  const computedExpenseCol = getColIdx(headers, ["Computed Value Limit", "ECOMMERCE_EXPENSE_TAXES", "Maximum Expense"]);
  const evaluationHealthLogCol = getColIdx(headers, ["System Structural Health Overview", "Error Logs", "what to fix"]);
  const segmentClassificationCol = getColIdx(headers, ["Segment Category", "CATEGORY", "Category"]);

  if (col === skuCol && skuCol > 0) {
    const matrixSheet = ss.getSheetByName("Asset_Pricing_Matrix");
    const stockSheet = ss.getSheetByName("Warehouse_Inventory");

    if (matrixSheet && assetCostCol > 0) {
      const activeSku = (e.range.getValue() || "").toString().trim();
      const internalValidationLog = [];

      if (!activeSku) {
        sheet.getRange(row, assetCostCol).setValue("");
        if (evaluationHealthLogCol > 0) sheet.getRange(row, evaluationHealthLogCol).setValue("");
      } else {
        const pricingProfile = lookupProductCost(activeSku, matrixSheet);

        if (!pricingProfile) {
          sheet.getRange(row, assetCostCol).setValue("");
          addError(internalValidationLog, "Item Cost Missing");
          if (evaluationHealthLogCol > 0) updateErrorLog(sheet, row, evaluationHealthLogCol, internalValidationLog);
        } else {
          sheet.getRange(row, assetCostCol).setValue(pricingProfile.productCost || "");

          if (stockSheet) {
            const allocationProfile = checkInventory(pricingProfile.fulfillmentSku, stockSheet);
            if (!allocationProfile) {
              addError(internalValidationLog, "Fulfillment SKU Missing");
            } else if (allocationProfile.errors.length > 0) {
              internalValidationLog.push(...allocationProfile.errors);
            }
          }

          if (evaluationHealthLogCol > 0) {
            updateErrorLog(sheet, row, evaluationHealthLogCol, internalValidationLog);
            sheet.getRange(row, evaluationHealthLogCol).setBackground(internalValidationLog.length > 0 ? "#ffcccc" : "#ffffff");
          }
        }
      }
    }
  }

  if (col === segmentClassificationCol && segmentClassificationCol > 0) {
    const engineConfig = ss.getSheetByName("System_Config");
    if (engineConfig && evaluationHealthLogCol > 0) {
      const activeClass = (e.range.getValue() || "").toString().trim();
      const runningTrackErrors = (sheet.getRange(row, evaluationHealthLogCol).getValue() || "").toString().trim().split("|").map(e => e.trim()).filter(e => e.length > 0);

      if (activeClass) {
        if (!validateCategory(activeClass, engineConfig)) {
          if (!runningTrackErrors.includes("Invalid Segment Classification")) addError(runningTrackErrors, "Invalid Segment Classification");
        } else {
          removeError(runningTrackErrors, "Invalid Segment Classification");
        }
      } else {
        removeError(runningTrackErrors, "Invalid Segment Classification");
      }
      updateErrorLog(sheet, row, evaluationHealthLogCol, runningTrackErrors);
    }
  }

  if (col === visualUrlCol && visualUrlCol > 0 && frameRenderCol > 0) {
    const eventLength = e.range.getNumRows();
    const targetedMatrix = sheet.getRange(row, visualUrlCol, eventLength, 1).getValues();
    const calculationStrings = targetedMatrix.map((r, i) => {
      const singleString = (r[0] || "").toString().trim();
      if (!singleString) return [""];
      const indexCellCoordinates = sheet.getRange(row + i, visualUrlCol).getA1Notation();
      return [`=IMAGE(${indexCellCoordinates})`];
    });
    sheet.getRange(row, frameRenderCol, eventLength, 1).setFormulas(calculationStrings);
  }

  if (col === geographyCol && geographyCol > 0) {
    const configurationProfileMatrix = ss.getSheetByName("System_Config");
    if (configurationProfileMatrix && operationalFreightCol > 0) {
      let activeCountryKey = (e.range.getValue() || "").toString().trim().toLowerCase();
      if (!activeCountryKey) {
        sheet.getRange(row, operationalFreightCol).setValue("");
      } else {
        const baselineData = configurationProfileMatrix.getRange(2, 1, configurationProfileMatrix.getLastRow() - 1, 2).getValues();
        const logisticalCostMap = {};
        baselineData.forEach((r) => {
          const entryCountry = (r[0] || "").toString().trim().toLowerCase();
          if (entryCountry) logisticalCostMap[entryCountry] = r[1];
        });
        sheet.getRange(row, operationalFreightCol).setValue(logisticalCostMap[activeCountryKey] || "");
      }
    }
  }

  if ((col === monetaryLabelCol || col === currencyPriceCol) && monetaryLabelCol > 0) {
    const functionalCurrency = (sheet.getRange(row, monetaryLabelCol).getValue() || "").toString().trim().toUpperCase();
    const activeRawValue = parseFloat(sheet.getRange(row, currencyPriceCol).getValue());
    let internalCalculationCoefficient = "";

    if (functionalCurrency) {
      if (functionalCurrency === "INR") {
        internalCalculationCoefficient = 1;
      } else {
        try {
          const conversionEndpoint = "https://open.er-api.com/v6/latest/INR";
          const transactionDataPayload = UrlFetchApp.fetch(conversionEndpoint, { muteHttpExceptions: true });
          const validationJson = JSON.parse(transactionDataPayload.getContentText());
          if (validationJson?.rates?.[functionalCurrency]) internalCalculationCoefficient = 1 / validationJson.rates[functionalCurrency];
        } catch (err) {
          internalCalculationCoefficient = "";
        }
      }
    }

    if (standardRatioCol > 0) sheet.getRange(row, standardRatioCol).setValue(internalCalculationCoefficient);
    if (localizedNormalizationCol > 0) {
      if (!isNaN(activeRawValue) && internalCalculationCoefficient !== "") {
        sheet.getRange(row, localizedNormalizationCol).setValue(activeRawValue * internalCalculationCoefficient);
      } else {
        sheet.getRange(row, localizedNormalizationCol).setValue("");
      }
    }
  }

  const calculationDependencyArray = [localizedNormalizationCol, assetCostCol, operationalFreightCol, geographyCol, monetaryLabelCol, currencyPriceCol, standardRatioCol];
  if (calculationDependencyArray.includes(col) && computedExpenseCol > 0) {
    executeFinancialModelingPipeline(sheet, row, ss, headers);
  }
}

// ==========================================================================================
// 💰 MARGIN PIPELINE: Calculate Balances, Cost Overhead, and Yield
// ==========================================================================================
function executeFinancialModelingPipeline(sheet, row, ss, headers) {
  const configurationProfileMatrix = ss.getSheetByName("System_Config");
  if (!configurationProfileMatrix) return;

  const normalizedPriceCol = getColIdx(headers, ["Normalized Currency Conversion", "PRICE_IN_INR"]);
  const assetCostCol = getColIdx(headers, ["Asset Cost Standard", "PRODUCT_COST"]);
  const operationalFreightCol = getColIdx(headers, ["Logistics Overhead Value", "SHIPPING_CHARGE", "Shipping Charge Product"]);
  const geographyCol = getColIdx(headers, ["Regional Zone Profile", "COUNTRY", "Country"]);
  const computedExpenseCol = getColIdx(headers, ["Computed Value Limit", "ECOMMERCE_EXPENSE_TAXES", "Maximum Expense"]);
  const functionalCostCol = getColIdx(headers, ["Realized System Transaction Cost", "Actual Expense"]);
  const optimizationMarginCol = getColIdx(headers, ["Calculated Margin High Watermark", "ESTIMATED_PROFIT", "Estimated Profit"]);
  const targetedNetYieldCol = getColIdx(headers, ["Realized Net Returns", "Actual Profit"]);

  if (!normalizedPriceCol || !assetCostCol || !operationalFreightCol || !geographyCol || !computedExpenseCol) return;

  const transactionPriceMetric = parseFloat(sheet.getRange(row, normalizedPriceCol).getValue()) || 0;
  const standardComponentCost = parseFloat(sheet.getRange(row, assetCostCol).getValue()) || 0;
  const directFreightCost = parseFloat(sheet.getRange(row, operationalFreightCol).getValue()) || 0;
  const dynamicLocationToken = (sheet.getRange(row, geographyCol).getValue() || "").toString().trim().toLowerCase();

  if (!transactionPriceMetric || !standardComponentCost || !directFreightCost || !dynamicLocationToken) return;

  const extractionBoundary = configurationProfileMatrix.getRange(2, 1, configurationProfileMatrix.getLastRow() - 1, 3).getValues();
  let systemVariableFactor = 0;
  for (let i = 0; i < extractionBoundary.length; i++) {
    const iterationCountryToken = (extractionBoundary[i][0] || "").toString().trim().toLowerCase();
    if (iterationCountryToken === dynamicLocationToken) {
      systemVariableFactor = parseFloat(extractionBoundary[i][2]) || 0;
      break;
    }
  }

  const rawComputedExpense = transactionPriceMetric * systemVariableFactor;
  const operationalOverheadSum = standardComponentCost + directFreightCost;
  const localizedTargetMargin = transactionPriceMetric * 0.2;
  const cumulativeFinancialYield = rawComputedExpense - operationalOverheadSum + localizedTargetMargin;

  if (computedExpenseCol > 0) sheet.getRange(row, computedExpenseCol).setValue(rawComputedExpense);
  if (functionalCostCol > 0) sheet.getRange(row, functionalCostCol).setValue(operationalOverheadSum);
  if (optimizationMarginCol > 0) sheet.getRange(row, optimizationMarginCol).setValue(localizedTargetMargin);
  if (targetedNetYieldCol > 0) sheet.getRange(row, targetedNetYieldCol).setValue(cumulativeFinancialYield);
}

// ==========================================================================================
// 📤 BATCH TRANSACTION: Structural Migration Pipeline (Staging → Master)
// ==========================================================================================
function pushStagingToMaster() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stagingSheet = ss.getSheetByName("Staging_Orders");
  if (!stagingSheet) {
    SpreadsheetApp.getUi().alert("❌ Critical Operational Fault: Staging sheet context missing.");
    return;
  }

  const startRow = 3;
  const lastRow = stagingSheet.getLastRow();
  const lastCol = stagingSheet.getLastColumn();

  if (lastRow < startRow) {
    SpreadsheetApp.getUi().alert("ℹ️ Execution Aborted: Staging area contains no row data.");
    return;
  }

  const headerDefinitionArray = stagingSheet.getRange(2, 1, 1, lastCol).getValues()[0];

  let calculatedConversionArray = {};
  try {
    const conversionEndpoint = "https://open.er-api.com/v6/latest/INR";
    const connectivityPayload = UrlFetchApp.fetch(conversionEndpoint, { muteHttpExceptions: true });
    calculatedConversionArray = JSON.parse(connectivityPayload.getContentText()).rates || {};
  } catch (e) {
    SpreadsheetApp.getUi().alert("❌ Telemetry Gateway Interrupted:\n" + e);
    return;
  }

  const monetaryLabelColIdx = getColIdx(headerDefinitionArray, ["Base Unit Classification", "CURRENCY"]) - 1;
  const currencyPriceColIdx = getColIdx(headerDefinitionArray, ["Stated Price", "Price", "CURRENCY_PRICE"]) - 1;
  const standardRatioColIdx = getColIdx(headerDefinitionArray, ["Conversion Coefficient Value", "INR"]) - 1;
  const localizedNormalizationColIdx = getColIdx(headerDefinitionArray, ["Normalized Currency Conversion", "PRICE_IN_INR"]) - 1;

  if (monetaryLabelColIdx >= 0 && standardRatioColIdx >= 0) {
    const bulkLength = lastRow - startRow + 1;
    const multiRowExtractionBlock = stagingSheet.getRange(startRow, 1, bulkLength, lastCol).getValues();
    const transformRatioBuffer = [];
    const absoluteNormalizedValueBuffer = [];

    for (let i = 0; i < bulkLength; i++) {
      const activeUnitString = (multiRowExtractionBlock[i][monetaryLabelColIdx] || "").toString().trim().toUpperCase();
      const itemNumericPrice = currencyPriceColIdx >= 0 ? parseFloat(multiRowExtractionBlock[i][currencyPriceColIdx]) : NaN;
      let calculatedFactor = activeUnitString === "INR" ? 1 : calculatedConversionArray[activeUnitString] ? 1 / calculatedConversionArray[activeUnitString] : "";

      transformRatioBuffer.push([calculatedFactor]);
      absoluteNormalizedValueBuffer.push([!isNaN(itemNumericPrice) && calculatedFactor !== "" ? itemNumericPrice * calculatedFactor : ""]);
    }
    stagingSheet.getRange(startRow, standardRatioColIdx + 1, bulkLength, 1).setValues(transformRatioBuffer);
    if (localizedNormalizationColIdx >= 0) stagingSheet.getRange(startRow, localizedNormalizationColIdx + 1, bulkLength, 1).setValues(absoluteNormalizedValueBuffer);
    SpreadsheetApp.flush();
  }

  for (let evaluationIterator = startRow; evaluationIterator <= lastRow; evaluationIterator++) {
    executeFinancialModelingPipeline(stagingSheet, evaluationIterator, ss, headerDefinitionArray);
  }
  SpreadsheetApp.flush();

  const sourceRecordColIdx = getColIdx(headerDefinitionArray, ["Source Record ID", "TRANSACTION_ID", "PortalOrderID"]) - 1;
  const evaluationHealthLogColIdx = getColIdx(headerDefinitionArray, ["System Structural Health Overview", "Error Logs", "what to fix"]) - 1;

  const incompleteSequenceBuffer = [];
  const trackingErrorSequenceBuffer = [];
  const bulkDataLength = lastRow - startRow + 1;
  const globalStagingDataCache = stagingSheet.getRange(startRow, 1, bulkDataLength, lastCol).getValues();

  for (let runningIndex = 0; runningIndex < bulkDataLength; runningIndex++) {
    const isolatedRowValues = globalStagingDataCache[runningIndex];
    const sequenceRecordId = sourceRecordColIdx >= 0 ? (isolatedRowValues[sourceRecordColIdx] || "").toString().trim() : "";
    if (!sequenceRecordId) continue;

    const loggedDiscrepancyString = evaluationHealthLogColIdx >= 0 ? (isolatedRowValues[evaluationHealthLogColIdx] || "").toString().trim() : "";
    if (loggedDiscrepancyString) trackingErrorSequenceBuffer.push(sequenceRecordId);

    let criticalOmissions = [];
    for (let schemaScannerIndex = 0; schemaScannerIndex < headerDefinitionArray.length; schemaScannerIndex++) {
      if (isOptionalField(headerDefinitionArray[schemaScannerIndex])) continue;
      if ((isolatedRowValues[schemaScannerIndex] || "").toString().trim() === "") criticalOmissions.push(headerDefinitionArray[schemaScannerIndex]);
    }

    if (criticalOmissions.length > 0) {
      incompleteSequenceBuffer.push(sequenceRecordId);
      if (evaluationHealthLogColIdx >= 0) {
        const errorStringPayload = "Required structural data point undefined: " + criticalOmissions.join(", ");
        let compositeErrorPayload = errorStringPayload;
        if (loggedDiscrepancyString) compositeErrorPayload = errorStringPayload + " | " + loggedDiscrepancyString;
        stagingSheet.getRange(startRow + runningIndex, evaluationHealthLogColIdx + 1).setValue(compositeErrorPayload).setBackground("#ffcccc");
      }
    }
  }

  const cumulativeErrorVectorMap = [...new Set([...incompleteSequenceBuffer, ...trackingErrorSequenceBuffer])];
  if (cumulativeErrorVectorMap.length > 0) {
    SpreadsheetApp.getUi().alert(
      "❌ STAGING SHIELD BLOCKED TRANSFERS - Exceptions detected at keys:\n" + cumulativeErrorVectorMap.join(", ") + "\n\nResolve all flagged rows before executing commit instructions."
    );
    return;
  }

  const masterSheet = ss.getSheetByName("Master_Dataset");
  if (!masterSheet) {
    SpreadsheetApp.getUi().alert("❌ Critical Deployment Failure: Destination repository context missing.");
    return;
  }

  const masterTotalColumns = masterSheet.getLastColumn();
  const masterHeaderDefinitions = masterSheet.getRange(2, 1, 1, masterTotalColumns).getValues()[0];
  const masterCategoryColumnIndex = getColIdx(masterHeaderDefinitions, ["Segment Category", "CATEGORY"]) - 1;
  const legacyRecordUniquenessSet = new Set();
  const masterTotalRows = masterSheet.getLastRow();
  const masterRenderFrameIndex = getColIdx(masterHeaderDefinitions, ["Render Frame", "IMAGE"]) - 1;

  if (masterTotalRows >= 3) {
    const historicalArrayCache = masterSheet.getRange(3, 1, masterTotalRows - 2, masterTotalColumns).getValues();
    historicalArrayCache.forEach((row) => {
      const distinctRowSignature = row.map((cell, idx) => idx === masterRenderFrameIndex ? "" : (cell || "").toString().trim()).join("|||");
      legacyRecordUniquenessSet.add(distinctRowSignature);
    });
  }

  const nonCommittedStagingCache = stagingSheet.getRange(startRow, 1, bulkDataLength, lastCol).getValues();

  const outboundQualifiedRows = nonCommittedStagingCache.filter((row) => {
    const systemVerificationToken = sourceRecordColIdx >= 0 ? (row[sourceRecordColIdx] || "").toString().trim() : "";
    if (!systemVerificationToken) return false;
    const processingComparisonRowBuffer = new Array(masterHeaderDefinitions.length).fill("");
    masterHeaderDefinitions.forEach((masterHeadLabel, masterHeadIndex) => {
      const sourceStructuralIndex = getEquivalentHeaderIndex(masterHeadLabel, headerDefinitionArray);
      if (sourceStructuralIndex !== -1 && masterHeadIndex !== masterRenderFrameIndex) {
        processingComparisonRowBuffer[masterHeadIndex] = (row[sourceStructuralIndex] || "").toString().trim();
      }
    });
    return !legacyRecordUniquenessSet.has(processingComparisonRowBuffer.join("|||"));
  }).map((row) => {
    const individualMappedOutputRow = new Array(masterHeaderDefinitions.length).fill("");
    masterHeaderDefinitions.forEach((masterHeadLabel, masterHeadIndex) => {
      const sourceStructuralIndex = getEquivalentHeaderIndex(masterHeadLabel, headerDefinitionArray);
      if (sourceStructuralIndex !== -1) {
        let terminalExtractionValue = masterHeadIndex === masterRenderFrameIndex ? "" : row[sourceStructuralIndex];
        if (masterCategoryColumnIndex >= 0 && masterHeadIndex === masterCategoryColumnIndex) terminalExtractionValue = formatTitleCase(terminalExtractionValue);
        individualMappedOutputRow[masterHeadIndex] = terminalExtractionValue;
      }
    });
    return individualMappedOutputRow;
  });

  if (outboundQualifiedRows.length === 0) {
    SpreadsheetApp.getUi().alert("ℹ️ Data Integrity Status: Master dataset is entirely concurrent with staging.");
    return;
  }

  const storageInsertionPointer = masterSheet.getLastRow() + 1;
  masterSheet.getRange(storageInsertionPointer, 1, outboundQualifiedRows.length, masterHeaderDefinitions.length).setValues(outboundQualifiedRows);
  applyVisualFormulasToMaster(storageInsertionPointer, outboundQualifiedRows.length);

  SpreadsheetApp.getUi().alert("✅ Verification Complete: " + outboundQualifiedRows.length + " distinct entry row sets committed to Master Repository.");
}

// ==========================================================================================
// 🔄 INTEGRATION: Match Tracking Sequence Constraints
// ==========================================================================================
function syncLastMaxFromMaster() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName("System_Config");
  const masterSheet = ss.getSheetByName("Master_Dataset");

  if (!configSheet || !masterSheet) return;

  const configTotalColumns = configSheet.getLastColumn();
  const configTotalRows = configSheet.getLastRow();
  const configHeaderDefinitions = configSheet.getRange(1, 1, 1, configTotalColumns).getValues()[0];

  const configPrefixKeyIndex = getColIdx(configHeaderDefinitions, ["Prefix Token Mapping", "Initial code"]) - 1;
  const configHighWatermarkIndex = getColIdx(configHeaderDefinitions, ["High Watermark Tracker", "Last Maximum"]) - 1;

  if (configPrefixKeyIndex < 0 || configHighWatermarkIndex < 0 || configTotalRows < 2) return;

  const configurationsArrayCache = configSheet.getRange(2, 1, configTotalRows - 1, configTotalColumns).getValues();
  const prefixHighWatermarkIndexMap = {};
  configurationsArrayCache.forEach((row) => {
    const stringTokenKey = (row[configPrefixKeyIndex] || "").toString().trim().toUpperCase();
    if (stringTokenKey) prefixHighWatermarkIndexMap[stringTokenKey] = 0;
  });

  const sequentialDataParser = (targetEvaluationSheet) => {
    if (!targetEvaluationSheet || targetEvaluationSheet.getLastRow() < 3) return;
    const calculationHeaderDefinitions = targetEvaluationSheet.getRange(2, 1, 1, targetEvaluationSheet.getLastColumn()).getValues()[0];
    const coreSystemIdentifierColumnIndex = getColIdx(calculationHeaderDefinitions, ["Internal System Identifier", "INTERNAL_ORDERNO", "Internal OrderNo"]) - 1;
    if (coreSystemIdentifierColumnIndex < 0) return;

    const dataColumnArrayValues = targetEvaluationSheet.getRange(3, coreSystemIdentifierColumnIndex + 1, targetEvaluationSheet.getLastRow() - 2, 1).getValues();
    dataColumnArrayValues.forEach((row) => {
      const targetEvaluationString = (row[0] || "").toString().trim();
      const executionRegexEvaluationPattern = targetEvaluationString.match(/^([A-Za-z]*)(\d+)(?:-[A-Za-z0-9]+)?$/);
      if (executionRegexEvaluationPattern) {
        const extractionPrefixToken = executionRegexEvaluationPattern[1].toUpperCase();
        const absoluteNumericSequenceValue = parseInt(executionRegexEvaluationPattern[2], 10);
        if (prefixHighWatermarkIndexMap.hasOwnProperty(extractionPrefixToken) && absoluteNumericSequenceValue > prefixHighWatermarkIndexMap[extractionPrefixToken]) {
          prefixHighWatermarkIndexMap[extractionPrefixToken] = absoluteNumericSequenceValue;
        }
      }
    });
  };

  sequentialDataParser(masterSheet);
  sequentialDataParser(ss.getSheetByName("Staging_Orders"));

  const generatedOutputAllocationMatrix = configurationsArrayCache.map((row) => {
    const iterationPrefixKey = (row[configPrefixKeyIndex] || "").toString().trim().toUpperCase();
    return iterationPrefixKey && prefixHighWatermarkIndexMap.hasOwnProperty(iterationPrefixKey) ? [prefixHighWatermarkIndexMap[iterationPrefixKey]] : [""];
  });

  configSheet.getRange(2, configHighWatermarkIndex + 1, generatedOutputAllocationMatrix.length, 1).setValues(generatedOutputAllocationMatrix);
  SpreadsheetApp.getUi().alert("✅ Calibration Completed: System sequence vectors equalized.");
}

// ==========================================================================================
// 🔢 SEQUENCER ENGINE: High Performance O(1) Transaction Sequence Engine
// ==========================================================================================
function generateInternalSystemIdFast(ss, sheet, editStartRow, numEditedRows, headers) {
  const organizationalClassColIdx = getColIdx(headers, ["Organizational Component Code", "BRAND_NAME", "Brand Name"]) - 1;
  const sourceRecordColIdx = getColIdx(headers, ["Source Record ID", "TRANSACTION_ID", "PortalOrderID"]) - 1;
  const uniqueIdentityIndexColIdx = getColIdx(headers, ["Internal System Identifier", "INTERNAL_ORDERNO", "Internal OrderNo"]) - 1;
  const intakeChannelColIdx = getColIdx(headers, ["Distribution Point", "SALES_CHANNEL", "Sales Channel"]) - 1;
  const subscriberIdentityColIdx = getColIdx(headers, ["Subscriber Name", "FULLNAME", "Fullname"]) - 1;
  const epochDateColIdx = getColIdx(headers, ["Origin Epoch Date", "PURCHASE_DATE", "Purchase Date"]) - 1;

  if (uniqueIdentityIndexColIdx < 0 || organizationalClassColIdx < 0 || sourceRecordColIdx < 0) return;

  const configSheet = ss.getSheetByName("System_Config");
  if (!configSheet || configSheet.getLastRow() < 2) return;

  const confHeaders = configSheet.getRange(1, 1, 1, configSheet.getLastColumn()).getValues()[0];
  const confBrandCol = getColIdx(confHeaders, ["Brand Name"]) - 1;
  const confInitialCol = getColIdx(confHeaders, ["Prefix Token Mapping", "Initial code"]) - 1;
  const confLastMaxCol = getColIdx(confHeaders, ["High Watermark Tracker", "Last Maximum"]) - 1;
  const confUniqueSCCol = getColIdx(confHeaders, ["Unique Channel Vector", "Unique Sales Channel"]) - 1;

  if (confBrandCol < 0 || confInitialCol < 0 || confLastMaxCol < 0) return;

  const configData = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, configSheet.getLastColumn()).getValues();
  const brandConfig = {}; 
  const validationChannelFilterSet = new Set();

  configData.forEach((row, i) => {
    const brandKey = (row[confBrandCol] || "").toString().trim().toLowerCase();
    const tokenPrefix = (row[confInitialCol] || "").toString().trim();
    const watermarkSequenceValue = parseInt(row[confLastMaxCol]) || 0;
    if (brandKey && tokenPrefix) {
      brandConfig[brandKey] = { initial: tokenPrefix, max: watermarkSequenceValue, configRow: i + 2 };
    }
    if (confUniqueSCCol >= 0) {
      const operationalChannelToken = (row[confUniqueSCCol] || "").toString().trim().toLowerCase();
      if (operationalChannelToken) validationChannelFilterSet.add(operationalChannelToken);
    }
  });

  const dataStartRow = 3;
  const sheetLastRow = sheet.getLastRow();
  const indexCrossReferenceBuffer = {}; 
  
  if (sheetLastRow >= dataStartRow) {
    const evaluationDataRangeValues = sheet.getRange(dataStartRow, 1, sheetLastRow - dataStartRow + 1, headers.length).getValues();
    evaluationDataRangeValues.forEach(row => {
      const evaluationSourceKey = (row[sourceRecordColIdx] || "").toString().trim().toLowerCase();
      const outputSystemIndexToken = (row[uniqueIdentityIndexColIdx] || "").toString().trim();
      if (evaluationSourceKey && outputSystemIndexToken) indexCrossReferenceBuffer[evaluationSourceKey] = outputSystemIndexToken;
    });
  }

  const trackingModificationExtractionRange = sheet.getRange(editStartRow, 1, numEditedRows, headers.length).getValues();
  const updatesScheduledMap = {}; 
  const functionalOutputArrayBuffer = [];

  for (let i = 0; i < numEditedRows; i++) {
    const activeExecutionRowValues = trackingModificationExtractionRange[i];
    const operationalBrandConstraint = (activeExecutionRowValues[organizationalClassColIdx] || "").toString().trim().toLowerCase();
    const sourceSystemTrackingIndex = (activeExecutionRowValues[sourceRecordColIdx] || "").toString().trim();
    const targetPreExistingIdValue = (activeExecutionRowValues[uniqueIdentityIndexColIdx] || "").toString().trim();

    if (!operationalBrandConstraint || !sourceSystemTrackingIndex || !brandConfig[operationalBrandConstraint]) {
        functionalOutputArrayBuffer.push([targetPreExistingIdValue]);
        continue;
    }

    let localIdentityString = indexCrossReferenceBuffer[sourceSystemTrackingIndex.toLowerCase()];

    if (!localIdentityString && i > 0 && intakeChannelColIdx >= 0 && subscriberIdentityColIdx >= 0) {
        const targetedChannelStringValue = (activeExecutionRowValues[intakeChannelColIdx] || "").toString().trim().toLowerCase();
        
        if ([...validationChannelFilterSet].some((channelFilter) => targetedChannelStringValue.includes(channelFilter))) {
            const clientValidationIdentityString = (activeExecutionRowValues[subscriberIdentityColIdx] || "").toString().trim().toLowerCase();
            const processEventDateKeyString = epochDateColIdx >= 0 ? (activeExecutionRowValues[epochDateColIdx] || "").toString().trim().toLowerCase() : "";
            
            if (clientValidationIdentityString) {
                const predecessorIterationRowCache = trackingModificationExtractionRange[i - 1];
                const baselinePredecessorBrand = (predecessorIterationRowCache[organizationalClassColIdx] || "").toString().trim().toLowerCase();
                const baselinePredecessorClient = (predecessorIterationRowCache[subscriberIdentityColIdx] || "").toString().trim().toLowerCase();
                const baselinePredecessorChannel = (predecessorIterationRowCache[intakeChannelColIdx] || "").toString().trim().toLowerCase();
                const baselinePredecessorDate = epochDateColIdx >= 0 ? (predecessorIterationRowCache[epochDateColIdx] || "").toString().trim().toLowerCase() : "";
                
                if (baselinePredecessorBrand === operationalBrandConstraint && baselinePredecessorClient === clientValidationIdentityString && baselinePredecessorDate === processEventDateKeyString && 
                    [...validationChannelFilterSet].some((channelFilter) => baselinePredecessorChannel.includes(channelFilter)) && functionalOutputArrayBuffer[i - 1]?.[0]) {
                    localIdentityString = functionalOutputArrayBuffer[i - 1][0];
                }
            }
        }
    }

    if (!localIdentityString) {
      const operationalConfigurationReference = brandConfig[operationalBrandConstraint];
      operationalConfigurationReference.max += 1;
      localIdentityString = operationalConfigurationReference.initial.toUpperCase() + operationalConfigurationReference.max;
      
      indexCrossReferenceBuffer[sourceSystemTrackingIndex.toLowerCase()] = localIdentityString;
      updatesScheduledMap[operationalConfigurationReference.configRow] = operationalConfigurationReference.max;
    }
    functionalOutputArrayBuffer.push([localIdentityString]);
  }

  sheet.getRange(editStartRow, uniqueIdentityIndexColIdx + 1, functionalOutputArrayBuffer.length, 1).setValues(functionalOutputArrayBuffer);

  for (const [rowIdx, dynamicallyCalculatedWatermark] of Object.entries(updatesScheduledMap)) {
    configSheet.getRange(parseInt(rowIdx), confLastMaxCol + 1).setValue(dynamicallyCalculatedWatermark);
  }
}

// ==========================================================================================
// 🔄 COMPRESSION RECALIBRATOR: Collapse Sequencing Gaps on Mutation
// ==========================================================================================
function recalcInternalSystemIndices(ss, sheet, editedRow, headers) {
  const organizationalClassColIdx = getColIdx(headers, ["Organizational Component Code", "BRAND_NAME", "Brand Name"]) - 1;
  const uniqueIdentityIndexColIdx = getColIdx(headers, ["Internal System Identifier", "INTERNAL_ORDERNO", "Internal OrderNo"]) - 1;

  if (uniqueIdentityIndexColIdx < 0 || organizationalClassColIdx < 0) return;
  const dataStartRow = 3;
  if (sheet.getLastRow() < dataStartRow) return;

  const linearWorksheetCacheArray = sheet.getRange(dataStartRow, 1, sheet.getLastRow() - dataStartRow + 1, headers.length).getValues();
  const isolatedContextBrandKey = (linearWorksheetCacheArray[editedRow - dataStartRow]?.[organizationalClassColIdx] || "").toString().trim().toLowerCase();
  if (!isolatedContextBrandKey) return;

  const configSheet = ss.getSheetByName("System_Config");
  if (!configSheet || configSheet.getLastRow() < 2) return;

  const configHeaderDefinitions = configSheet.getRange(1, 1, 1, configSheet.getLastColumn()).getValues()[0];
  const configBrandCol = getColIdx(configHeaderDefinitions, ["Brand Name"]) - 1;
  const configInitialCol = getColIdx(configHeaderDefinitions, ["Prefix Token Mapping", "Initial code"]) - 1;
  const configHighWatermarkIndex = getColIdx(configHeaderDefinitions, ["High Watermark Tracker", "Last Maximum"]) - 1;

  if (configBrandCol < 0 || configInitialCol < 0 || configHighWatermarkIndex < 0) return;

  const configurationsArrayCache = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, configSheet.getLastColumn()).getValues();
  let trackingPrefixTokenValue = "", layoutTargetIndexPointer = -1;

  for (let idxScanner = 0; idxScanner < configurationsArrayCache.length; idxScanner++) {
    if ((configurationsArrayCache[idxScanner][configBrandCol] || "").toString().trim().toLowerCase() === isolatedContextBrandKey) {
      trackingPrefixTokenValue = (configurationsArrayCache[idxScanner][configInitialCol] || "").toString().trim().toUpperCase();
      layoutTargetIndexPointer = idxScanner;
      break;
    }
  }
  if (!trackingPrefixTokenValue) return;

  const mathematicalDeduplicationSet = new Set();
  const evaluationUniqueValueIndex = [];
  linearWorksheetCacheArray.forEach((row) => {
    if ((row[organizationalClassColIdx] || "").toString().trim().toLowerCase() === isolatedContextBrandKey) {
      const evaluationStructuralRegexMatch = (row[uniqueIdentityIndexColIdx] || "").toString().trim().match(/^([A-Za-z]*)(\d+)(?:-[A-Za-z0-9]+)?$/);
      if (evaluationStructuralRegexMatch) {
        const isolatedValueMetric = parseInt(evaluationStructuralRegexMatch[2], 10);
        if (isolatedValueMetric > 0 && !mathematicalDeduplicationSet.has(isolatedValueMetric)) {
          mathematicalDeduplicationSet.add(isolatedValueMetric);
          evaluationUniqueValueIndex.push(isolatedValueMetric);
        }
      }
    }
  });

  if (evaluationUniqueValueIndex.length === 0) return;
  const mathematicallySortedArray = [...evaluationUniqueValueIndex].sort((a, b) => a - b);
  const coreSequenceBaseSeed = mathematicallySortedArray[0];
  const relationalMappingCache = {};
  mathematicallySortedArray.forEach((num, idx) => (relationalMappingCache[num] = coreSequenceBaseSeed + idx));

  let assignmentMaxHighWatermark = 0;
  const conditionalTransformationBuffer = linearWorksheetCacheArray.map((row) => {
    const historicalStringCellValue = (row[uniqueIdentityIndexColIdx] || "").toString().trim();
    if ((row[organizationalClassColIdx] || "").toString().trim().toLowerCase() !== isolatedContextBrandKey) return [historicalStringCellValue];

    const evaluationStructuralRegexMatch = historicalStringCellValue.match(/^([A-Za-z]*)(\d+)(?:-[A-Za-z0-9]+)?$/);
    if (evaluationStructuralRegexMatch) {
      const modernCalculatedSequenceVal = relationalMappingCache[parseInt(evaluationStructuralRegexMatch[2], 10)] || parseInt(evaluationStructuralRegexMatch[2], 10);
      if (modernCalculatedSequenceVal > assignmentMaxHighWatermark) assignmentMaxHighWatermark = modernCalculatedSequenceVal;
      return [trackingPrefixTokenValue + modernCalculatedSequenceVal];
    }
    return [historicalStringCellValue];
  });

  sheet.getRange(dataStartRow, uniqueIdentityIndexColIdx + 1, conditionalTransformationBuffer.length, 1).setValues(conditionalTransformationBuffer);

  const referenceRepositorySheet = ss.getSheetByName("Master_Dataset");
  if (referenceRepositorySheet && referenceRepositorySheet.getLastRow() >= 3) {
    const analyticalHeaders = referenceRepositorySheet.getRange(2, 1, 1, referenceRepositorySheet.getLastColumn()).getValues()[0];
    const externalSystemIdentifierColumnIndex = getColIdx(analyticalHeaders, ["Internal System Identifier", "INTERNAL_ORDERNO", "Internal OrderNo"]) - 1;
    if (externalSystemIdentifierColumnIndex >= 0) {
      referenceRepositorySheet.getRange(3, externalSystemIdentifierColumnIndex + 1, referenceRepositorySheet.getLastRow() - 2, 1).getValues().forEach((r) => {
          const parsingMatchAssertion = (r[0] || "").toString().trim().match(/^([A-Za-z]*)(\d+)(?:-[A-Za-z0-9]+)?$/);
          if (parsingMatchAssertion && parsingMatchAssertion[1].toUpperCase() === trackingPrefixTokenValue) {
            assignmentMaxHighWatermark = Math.max(assignmentMaxHighWatermark, parseInt(parsingMatchAssertion[2], 10));
          }
        });
    }
  }

  if (assignmentMaxHighWatermark > 0) configSheet.getRange(2 + layoutTargetIndexPointer, configHighWatermarkIndex + 1).setValue(assignmentMaxHighWatermark);
}
