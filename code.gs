/* =============================================================================
 *   CORE ARCHITECTURE MANAGEMENT SYSTEM — staging_control.gs
 *   Google Apps Script for Input Staging Worksheet Automation Processes
 *
 *   Modules:
 *     1. System Configuration Maps & Structural Vector Dictionaries
 *     2. Operational Cache & Component Control Matrices
 *     3. Integrated Compliance Checking & Intercept Operations (6 fields)
 *     4. Hierarchical Entity Asset Profiler (StagingSKU → MapKey → Warehouse)
 *     5. Virtual Warehouse Tracking Arrays
 *     6. Distinct Transaction Sequence Engine (Continuous, Gap-Compression)
 *     7. Algorithmic Asset Financial Projections
 *     8. Append Operations targeting Master Repository Database
 *     9. Bulk-Optimized Event Route Listener (onEdit Router)
 *    10. Array Element Structural Degradation Interceptor
 *    11. Graphical User Interface Modal Component Engines
 *    12. Core Menu Initialization Sequences
 * ============================================================================= */

// ─────────────────────────────────────────────────────────────────────────────
//  1. SYSTEM CONFIGURATION MAPS & STRUCTURAL VECTOR DICTIONARIES
// ─────────────────────────────────────────────────────────────────────────────

var DATA_STORE_IDENTIFIERS = {
  STAGING_INPUT:   'Staging_Orders',
  MASTER_DATABASE: 'Master_Dataset',
  SYSTEM_CONFIG:   'System_Config',
  LOOKUP_RELATION: 'Asset_Pricing_Matrix',
  WAREHOUSE_STOCK: 'Warehouse_Inventory'
};

/**
 * Input Staging Column Index Key Vector Maps.
 * Maintain 1:1 mapping sync coordinates with layout header configurations.
 */
var COLUMN_SCHEMA_MAP = {
  SOURCE_RECORD_ID:     1,
  EXECUTION_TIMELINE:   2,
  OPERATION_FLAG:       3,
  REMITTANCE_STATUS:    4,
  INTERNAL_ANNOTATIONS: 5,
  ORGANIZATION_CODE:    6,
  UNIQUE_IDENTITY_INDEX:7,
  ORIGIN_EPOCH_DATE:    8,
  DISTRIBUTION_POINT:   9,
  SKU:                  10,
  ASSET_DESCRIPTOR:     11,
  SEGMENT_CATEGORY:     12,
  RENDER_FRAME:         13,
  TRANSACTION_NOTE:     14,
  QUANTITY_UNITS:       15,
  MONETARY_LABEL:       16,
  CURRENCY_PRICE:       17,
  SUBSCRIBER_IDENTITY:  18,
  LOCATION_STREET_1:    19,
  LOCATION_STREET_2:    20,
  LOCATION_CITY:        21,
  LOCATION_STATE:       22,
  LOCATION_POSTAL_CODE: 23,
  REGIONAL_ZONE_PROFILE:24,
  TELEMETRY_CONTACT:    25,
  LOGISTICS_OPERATOR:   26,
  CARRIER_SERIAL_TAG:   27,
  OPERATIONAL_STATE:    28,
  FREIGHT_SURCHARGE:    29,
  VISUAL_URL:           30,
  EXTERNAL_MAPPING:     31,
  REVISED_ROUTE_TAG:    32,
  STANDARD_RATIO:       33,
  LOCALIZED_NORMALIZATION: 34,
  OPERATIONAL_FREIGHT:  35,
  ASSET_COST_STANDARD:  36,
  COMPUTED_VALUE_LIMIT: 37,
  FUNCTIONAL_COST:      38,
  OPTIMIZATION_MARGIN:  39,
  TARGETED_NET_YIELD:   40,
  EVALUATION_HEALTH_LOG:41
};

/** High-water column limit boundary index for staging matrices */
var COLUMN_LIMIT_BOUNDARY = 41;

/** Positional rows tracking coordinates (Data indices initialised at row index 3) */
var METADATA_HEADER_ROW = 2;
var DATALAYER_START_ROW = 3;

/**
 * Control Configuration System Column Vectors mappings.
 */
var CONFIGURATION_SCHEMA_MAP = {
  Config_Zone_Profile:  1,
  Config_Freight_Fee:   2,
  Config_Margin_Factor: 3,
  Config_Currency_Token:4,
  Config_Group_Key:     5,
  Config_Prefix_Code:   6,
  Config_Sequence_Max:  7,
  Config_Channel_Tag:   8,
  Config_Segment_Class: 9,
  Config_Pipeline_Point:10,
  Config_Audit_Status:  11
};

/**
 * Relational Key Lookup matrix indices.
 */
var PRICING_MATRIX_SCHEMA_MAP = {
  Warehouse_SKU_Key: 1,
  Staging_SKU_Key:   2
};

/**
 * Inventory Allocation ledger indices.
 */
var INVENTORY_LEDGER_SCHEMA_MAP = {
  Warehouse_SKU_Key:  1,
  Visual_Asset_Frame: 2,
  Item_Nomenclature:  3,
  Allocated_Capacity: 4,
  Base_Unit_Cost:     5,
  Deployment_Zone:    6
};

/**
 * Control Map Binding: Staging Property Key Vector ──► Engine Control Matrix Field.
 */
var RETRIEVAL_VALIDATION_VECTOR_MAP = {
  SEGMENT_CATEGORY:      'Config_Segment_Class',
  REGIONAL_ZONE_PROFILE: 'Config_Zone_Profile',
  MONETARY_LABEL:        'Config_Currency_Token',
  ORGANIZATION_CODE:     'Config_Group_Key',
  DISTRIBUTION_POINT:    'Config_Pipeline_Point',
  REMITTANCE_STATUS:     'Config_Audit_Status'
};

/**
 * Strict structural parameter compliance target rules definitions.
 */
var SYSTEM_MANDATORY_CONSTRAINTS = [
  { key: 'SOURCE_RECORD_ID',      label: 'Source Record ID' },
  { key: 'ORGANIZATION_CODE',     label: 'Organization Code' },
  { key: 'SKU',                   label: 'SKU Parameter' },
  { key: 'QUANTITY_UNITS',        label: 'Quantity Units' },
  { key: 'MONETARY_LABEL',        label: 'Monetary Label' },
  { key: 'CURRENCY_PRICE',        label: 'Currency Price' },
  { key: 'REGIONAL_ZONE_PROFILE', label: 'Regional Zone Profile' },
  { key: 'SUBSCRIBER_IDENTITY',   label: 'Subscriber Identity' },
  { key: 'DISTRIBUTION_POINT',    label: 'Distribution Point' },
  { key: 'SEGMENT_CATEGORY',      label: 'Segment Category' },
  { key: 'EXECUTION_TIMELINE',    label: 'Execution Timeline' },
  { key: 'REMITTANCE_STATUS',     label: 'Remittance Status' },
  { key: 'ASSET_DESCRIPTOR',      label: 'Asset Descriptor' },
  { key: 'TRANSACTION_NOTE',      label: 'Transaction Note' },
  { key: 'LOCATION_STREET_1',     label: 'Location Street 1' },
  { key: 'LOCATION_CITY',         label: 'Location City' },
  { key: 'LOCATION_STATE',        label: 'Location State' },
  { key: 'LOCATION_POSTAL_CODE',  label: 'Location Postal Code' },
  { key: 'VISUAL_URL',            label: 'Visual URL' },
  { key: 'ORIGIN_EPOCH_DATE',     label: 'Origin Epoch Date' }
];

/** Structural Error State Visual Intercept HEX UI codes */
var EXCEPTION_HEX_COLOR = '#ffcdd2';   // Light alert color indicating data schema exceptions
var INTEGRITY_PASS_COLOR = null;       // Clearing operations state


// ─────────────────────────────────────────────────────────────────────────────
//  2. OPERATIONAL CACHE & COMPONENT CONTROL MATRICES
// ─────────────────────────────────────────────────────────────────────────────

function getConfigSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.SYSTEM_CONFIG);
}

function getConfigurationArray_(configVectorKey) {
  var sheet = getConfigSheet_();
  var columnTargetIdx = CONFIGURATION_SCHEMA_MAP[configVectorKey];
  var totalRows = sheet.getLastRow();
  if (totalRows < 2) return [];

  var dataBlock = sheet.getRange(2, columnTargetIdx, totalRows - 1, 1).getValues();
  var structuredCollection = [];
  var duplicationFilterMap = {};
  for (var i = 0; i < dataBlock.length; i++) {
    var standardValue = String(dataBlock[i][0]).trim();
    if (standardValue !== '' && !duplicationFilterMap[standardValue]) {
      structuredCollection.push(standardValue);
      duplicationFilterMap[standardValue] = true;
    }
  }
  return structuredCollection;
}

var _globalMemoryCachePool = null;
function getCachedConfigData_() {
  if (_globalMemoryCachePool) return _globalMemoryCachePool;
  var sheet = getConfigSheet_();
  var totalRows = sheet.getLastRow();
  if (totalRows < 2) return [];
  var valuesBlock = sheet.getRange(2, 1, totalRows - 1, sheet.getLastColumn()).getValues();
  _globalMemoryCachePool = valuesBlock;
  return valuesBlock;
}

function compileGroupPrefixTokenMap_() {
  var dataCache = getCachedConfigData_();
  var associativeMap = {};
  for (var i = 0; i < dataCache.length; i++) {
    var organizationKey = String(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Group_Key - 1]).trim();
    if (organizationKey) {
      associativeMap[organizationKey] = {
        Prefix_Code:   String(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Prefix_Code - 1]).trim(),
        Sequence_Max:  Number(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max - 1]) || 0,
        Freight_Fee:   Number(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Freight_Fee - 1]) || 0,
        Margin_Factor: Number(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Margin_Factor - 1]) || 0,
        configSheetRowIndex: i + 2  
      };
    }
  }
  return associativeMap;
}

function compileGeographicPricingMap_() {
  var dataCache = getCachedConfigData_();
  var associativeMap = {};
  for (var i = 0; i < dataCache.length; i++) {
    var geographicToken = String(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Zone_Profile - 1]).trim();
    if (geographicToken) {
      associativeMap[geographicToken] = {
        Freight_Fee:   Number(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Freight_Fee - 1]) || 0,
        Margin_Factor: Number(dataCache[i][CONFIGURATION_SCHEMA_MAP.Config_Margin_Factor - 1]) || 0
      };
    }
  }
  return associativeMap;
}


// ─────────────────────────────────────────────────────────────────────────────
//  3. INTEGRATED COMPLIANCE CHECKING & INTERCEPT OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

function enforceSchemaValidationsToRange_(sheet, targetStartRow, targetEndRow) {
  if (targetStartRow > targetEndRow) return;
  var rowsScopeLength = targetEndRow - targetStartRow + 1;

  var configControlSheet = getConfigSheet_();
  if (!configControlSheet) return;

  var highWaterConfigRowsCount = Math.max(2, configControlSheet.getMaxRows());

  for (var internalHeaderKey in RETRIEVAL_VALIDATION_VECTOR_MAP) {
    var designColumnIndex = COLUMN_SCHEMA_MAP[internalHeaderKey];
    if (!designColumnIndex) continue;

    var mappingConfigKey = RETRIEVAL_VALIDATION_VECTOR_MAP[internalHeaderKey];
    var dataColumnIndexTarget = CONFIGURATION_SCHEMA_MAP[mappingConfigKey];
    if (!dataColumnIndexTarget) continue;

    var ruleDefinitionScope = configControlSheet.getRange(2, dataColumnIndexTarget, highWaterConfigRowsCount - 1, 1);
    var targetedSelectionRange = sheet.getRange(targetStartRow, designColumnIndex, rowsScopeLength, 1);
    
    var dataValidationRuleObject = SpreadsheetApp.newDataValidation()
      .requireValueInRange(ruleDefinitionScope, true) 
      .setAllowInvalid(false)
      .build();
    targetedSelectionRange.setDataValidation(dataValidationRuleObject);
  }
}

function applyAllValidations() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;
  var lastRowDataIndex = sheet.getLastRow();
  if (lastRowDataIndex < DATALAYER_START_ROW) return;
  enforceSchemaValidationsToRange_(sheet, DATALAYER_START_ROW, lastRowDataIndex);
  generateSystemFeedbackNotification_('Data Constraints Imposed', 'Dropdown system boundaries successfully synchronized across active data tracks.', 'success');
}


// ─────────────────────────────────────────────────────────────────────────────
//  4. HIERARCHICAL ENTITY ASSET PROFILER
// ─────────────────────────────────────────────────────────────────────────────

function batchRenderGraphicViewports_(sheet, processingStartRow, processingEndRow) {
  var executionScopeLength = processingEndRow - processingStartRow + 1;
  if (executionScopeLength <= 0) return;

  var targetUrlMatrices = sheet.getRange(processingStartRow, COLUMN_SCHEMA_MAP.VISUAL_URL, executionScopeLength, 1).getValues();
  var calculationFormulaArray = [];

  for (var i = 0; i < executionScopeLength; i++) {
    var literalUrlString = String(targetUrlMatrices[i][0]).trim();
    if (!literalUrlString) {
      calculationFormulaArray.push(['']);
      continue;
    }
    calculationFormulaArray.push([
      '=IMAGE("' + literalUrlString.replace(/"/g, '""') + '")'
    ]);
  }

  sheet.getRange(processingStartRow, COLUMN_SCHEMA_MAP.RENDER_FRAME, executionScopeLength, 1).setFormulas(calculationFormulaArray);
}

function compileRelationalKeyLookupMap_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.LOOKUP_RELATION);
  if (!sheet) return {};
  var totalRows = sheet.getLastRow();
  if (totalRows < 2) return {};

  var valueBlock = sheet.getRange(2, 1, totalRows - 1, 2).getValues();
  var dynamicRelationalMap = {};
  for (var i = 0; i < valueBlock.length; i++) {
    var warehouseSKUKey = String(valueBlock[i][PRICING_MATRIX_SCHEMA_MAP.VendorSKU - 1]).trim();
    var stagingSKUKey   = String(valueBlock[i][PRICING_MATRIX_SCHEMA_MAP.PortalSKU - 1]).trim();
    if (stagingSKUKey && warehouseSKUKey) {
      dynamicRelationalMap[stagingSKUKey] = warehouseSKUKey;
    }
  }
  return dynamicRelationalMap;
}

function compileWarehouseInventoryLedgerMap_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.WAREHOUSE_STOCK);
  if (!sheet) return {};
  var totalRows = sheet.getLastRow();
  if (totalRows < 2) return {};

  var dataValuesMatrix = sheet.getRange(2, 1, totalRows - 1, 6).getValues();
  var inventoryCompilingMap = {};
  for (var i = 0; i < dataValuesMatrix.length; i++) {
    var warehouseKey = String(dataValuesMatrix[i][INVENTORY_LEDGER_SCHEMA_MAP.Warehouse_SKU_Key - 1]).trim();
    if (warehouseKey) {
      inventoryCompilingMap[warehouseKey] = {
        Visual_Asset_Frame: dataValuesMatrix[i][INVENTORY_LEDGER_SCHEMA_MAP.Visual_Asset_Frame - 1],
        Item_Nomenclature:  String(dataValuesMatrix[i][INVENTORY_LEDGER_SCHEMA_MAP.Item_Nomenclature - 1]).trim(),
        Allocated_Capacity: Number(dataValuesMatrix[i][INVENTORY_LEDGER_SCHEMA_MAP.Allocated_Capacity - 1]) || 0,
        Base_Unit_Cost:     Number(dataValuesMatrix[i][INVENTORY_LEDGER_SCHEMA_MAP.Base_Unit_Cost - 1]) || 0,
        Deployment_Zone:    String(dataValuesMatrix[i][INVENTORY_LEDGER_SCHEMA_MAP.Deployment_Zone - 1]).trim(),
        ledgerRowIndex:     i + 2   
      };
    }
  }
  return inventoryCompilingMap;
}

function getResolvedProductStructureInfo_(targetSkuString, crossReferenceMap, warehouseStockMap) {
  var resolvedWarehouseKey = crossReferenceMap[targetSkuString];
  if (!resolvedWarehouseKey) return null;
  var operationalStockRecord = warehouseStockMap[resolvedWarehouseKey];
  if (!operationalStockRecord) return null;
  return {
    Base_Unit_Cost:     operationalStockRecord.Base_Unit_Cost,
    Item_Nomenclature:  operationalStockRecord.Item_Nomenclature,
    Visual_Asset_Frame: operationalStockRecord.Visual_Asset_Frame,
    Warehouse_SKU_Key:  resolvedWarehouseKey,
    Allocated_Capacity: operationalStockRecord.Allocated_Capacity,
    ledgerRowIndex:     operationalStockRecord.ledgerRowIndex
  };
}

function syncIndividualTargetedRowsProductProfiles_(sheet, targetRowsArray) {
  if (!targetRowsArray || targetRowsArray.length === 0) return;

  var conversionRelationalMap = compileRelationalKeyLookupMap_();
  var databaseInventoryMap    = compileWarehouseInventoryLedgerMap_();
  var exceptionTraceBuffer    = [];

  for (var i = 0; i < targetRowsArray.length; i++) {
    var currentRowIndex = targetRowsArray[i];
    var processingSkuString = String(sheet.getRange(currentRowIndex, COLUMN_SCHEMA_MAP.SKU).getValue()).trim();
    if (!processingSkuString) continue;

    var resolutionProfileResult = getResolvedProductStructureInfo_(processingSkuString, conversionRelationalMap, databaseInventoryMap);
    var targetHealthLogCell = sheet.getRange(currentRowIndex, COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG);
    var activeErrorLogValue = String(targetHealthLogCell.getValue()).trim();
    
    var workingErrorsCollection = activeErrorLogValue.split('|').map(function(e) { return e.trim(); }).filter(function(e) {
      return e.length > 0 && e.indexOf('SKU lookup exception') === -1 && e !== 'Allocation Capacity Breached' && e !== '✅ Validation Integrity Maintained';
    });

    if (resolutionProfileResult) {
      sheet.getRange(currentRowIndex, COLUMN_SCHEMA_MAP.ASSET_COST_STANDARD).setValue(resolutionProfileResult.Base_Unit_Cost);
      
      if (resolutionProfileResult.Allocated_Capacity <= 0) {
        workingErrorsCollection.push('Allocation Capacity Breached');
      }
      targetHealthLogCell.setValue(workingErrorsCollection.join(' | '));
    } else {
      workingErrorsCollection.push('SKU lookup exception: ' + processingSkuString);
      targetHealthLogCell.setValue(workingErrorsCollection.join(' | '));
      exceptionTraceBuffer.push('Row ' + currentRowIndex + ': Token Identifier "' + processingSkuString + '" unresolved in Pricing Matrix definitions.');
    }
  }

  if (exceptionTraceBuffer.length > 0) {
    generateSystemFeedbackNotification_('Entity Definition Missing', exceptionTraceBuffer.join('\n'), 'warning');
  }
}

function batchProcessGlobalProductInformationSync_(sheet, extractionStartRow, extractionEndRow) {
  var dynamicRowsScopeLength = extractionEndRow - extractionStartRow + 1;
  if (dynamicRowsScopeLength <= 0) return;

  var conversionRelationalMap = compileRelationalKeyLookupMap_();
  var databaseInventoryMap    = compileWarehouseInventoryLedgerMap_();

  var structuralSkuDataCache = sheet.getRange(extractionStartRow, COLUMN_SCHEMA_MAP.SKU, dynamicRowsScopeLength, 1).getValues();

  var costMatrixAllocationOutput = [];
  var viewportClearanceBuffer    = [];
  var operationalHealthLogs      = [];
  var executionExclusionTrace    = [];

  for (var i = 0; i < dynamicRowsScopeLength; i++) {
    var evaluatedSkuToken = String(structuralSkuDataCache[i][0]).trim();
    if (!evaluatedSkuToken) {
      costMatrixAllocationOutput.push(['']);
      viewportClearanceBuffer.push(['']);
      operationalHealthLogs.push(['']);
      continue;
    }
    var compiledProfileMatch = getResolvedProductStructureInfo_(evaluatedSkuToken, conversionRelationalMap, databaseInventoryMap);
    if (compiledProfileMatch) {
      costMatrixAllocationOutput.push([compiledProfileMatch.Base_Unit_Cost]);
      viewportClearanceBuffer.push(['']);
      if (compiledProfileMatch.Allocated_Capacity <= 0) {
        operationalHealthLogs.push(['Allocation Capacity Breached']);
      } else {
        operationalHealthLogs.push(['']);
      }
    } else {
      costMatrixAllocationOutput.push(['']);
      viewportClearanceBuffer.push(['']);
      operationalHealthLogs.push(['SKU lookup exception: ' + evaluatedSkuToken]);
      executionExclusionTrace.push('Row ' + (extractionStartRow + i) + ': "' + evaluatedSkuToken + '"');
    }
  }

  sheet.getRange(extractionStartRow, COLUMN_SCHEMA_MAP.ASSET_COST_STANDARD, dynamicRowsScopeLength, 1).setValues(costMatrixAllocationOutput);
  sheet.getRange(extractionStartRow, COLUMN_SCHEMA_MAP.RENDER_FRAME, dynamicRowsScopeLength, 1).setValues(viewportClearanceBuffer);
  sheet.getRange(extractionStartRow, COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG, dynamicRowsScopeLength, 1).setValues(operationalHealthLogs);

  if (executionExclusionTrace.length > 0) {
    generateSystemFeedbackNotification_('Data Reference Structural Outliers', executionExclusionTrace.length + ' Item references unresolved:\n' + executionExclusionTrace.join('\n'), 'warning');
  }
}


// ─────────────────────────────────────────────────────────────────────────────
//  5. VIRTUAL WAREHOUSE TRACKING ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

function executeStockAllocationDecrements_(sheet, targetRowsArray) {
  if (!targetRowsArray || targetRowsArray.length === 0) return;

  var conversionRelationalMap = compileRelationalKeyLookupMap_();
  var databaseInventoryMap    = compileWarehouseInventoryLedgerMap_();
  var inventoryLedgerSheet    = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.WAREHOUSE_STOCK);
  if (!inventoryLedgerSheet) return;

  var accumulatedVolumeChanges = {}; 

  for (var i = 0; i < targetRowsArray.length; i++) {
    var activeTargetRow = targetRowsArray[i];
    var trackingSkuToken = String(sheet.getRange(activeTargetRow, COLUMN_SCHEMA_MAP.SKU).getValue()).trim();
    var quantityUnitsRequested = Number(sheet.getRange(activeTargetRow, COLUMN_SCHEMA_MAP.QUANTITY_UNITS).getValue()) || 0;
    if (!trackingSkuToken || quantityUnitsRequested <= 0) continue;

    var matchedWarehouseKey = conversionRelationalMap[trackingSkuToken];
    if (!matchedWarehouseKey || !databaseInventoryMap[matchedWarehouseKey]) continue;

    accumulatedVolumeChanges[matchedWarehouseKey] = (accumulatedVolumeChanges[matchedWarehouseKey] || 0) + quantityUnitsRequested;
  }

  for (var uniqueWarehouseKey in accumulatedVolumeChanges) {
    var cachedInventoryObject = databaseInventoryMap[uniqueWarehouseKey];
    var updatedCapacityBalance = Math.max(0, cachedInventoryObject.Allocated_Capacity - accumulatedVolumeChanges[uniqueWarehouseKey]);
    inventoryLedgerSheet.getRange(cachedInventoryObject.ledgerRowIndex, INVENTORY_LEDGER_SCHEMA_MAP.Allocated_Capacity).setValue(updatedCapacityBalance);
  }
}

function compensateWarehouseCapacityBalances_(skuTokenString, restorationVolumeUnits) {
  if (!skuTokenString || restorationVolumeUnits <= 0) return;

  var conversionRelationalMap = compileRelationalKeyLookupMap_();
  var databaseInventoryMap    = compileWarehouseInventoryLedgerMap_();
  var inventoryLedgerSheet    = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.WAREHOUSE_STOCK);
  if (!inventoryLedgerSheet) return;

  var mappedWarehouseKey = conversionRelationalMap[skuTokenString];
  if (!mappedWarehouseKey || !databaseInventoryMap[mappedWarehouseKey]) return;

  var cachedInventoryObject = databaseInventoryMap[mappedWarehouseKey];
  inventoryLedgerSheet.getRange(cachedInventoryObject.ledgerRowIndex, INVENTORY_LEDGER_SCHEMA_MAP.Allocated_Capacity).setValue(cachedInventoryObject.Allocated_Capacity + restorationVolumeUnits);
}

function lookupHistoricalMaximumSequenceBoundaries_(prefixStringToken) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var targetMasterSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.MASTER_DATABASE);
  if (!targetMasterSheet) return 0;
  var finalRowIndex = targetMasterSheet.getLastRow();
  if (finalRowIndex < DATALAYER_START_ROW) return 0;
  
  var extractedHeadersRowArray = targetMasterSheet.getRange(METADATA_HEADER_ROW, 1, 1, targetMasterSheet.getLastColumn()).getValues()[0];
  var targetedIdentityColumnPointer = -1;
  for (var i = 0; i < extractedHeadersRowArray.length; i++) {
    var transformedHeaderLabel = String(extractedHeadersRowArray[i]).trim().toUpperCase();
    if (transformedHeaderLabel === 'UNIQUE_IDENTITY_INDEX' || transformedHeaderLabel === 'UNIQUE IDENTITY INDEX') {
      targetedIdentityColumnPointer = i;
      break;
    }
  }
  if (targetedIdentityColumnPointer < 0) return 0;

  var structuralDataBlock = targetMasterSheet.getRange(DATALAYER_START_ROW, targetedIdentityColumnPointer + 1, finalRowIndex - DATALAYER_START_ROW + 1, 1).getValues();
  var maximumTrackedInteger = 0;
  var operationalNormalizedPrefix = prefixStringToken.toUpperCase();
  for (var j = 0; j < structuralDataBlock.length; j++) {
    var comparisonStringValue = String(structuralDataBlock[j][0]).trim();
    var serializationPatternMatch = comparisonStringValue.match(/^([A-Za-z]+)(\d+)(?:-[A-Za-z0-9]+)?$/);
    if (serializationPatternMatch && serializationPatternMatch[1].toUpperCase() === operationalNormalizedPrefix) {
      maximumTrackedInteger = Math.max(maximumTrackedInteger, parseInt(serializationPatternMatch[2], 10));
    }
  }
  return maximumTrackedInteger;
}


// ─────────────────────────────────────────────────────────────────────────────
//  6. DISTINCT TRANSACTION SEQUENCE ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function injectSequentialTrackingIndices_(sheet, targetedRowsArray) {
  if (!targetedRowsArray || targetedRowsArray.length === 0) return;

  var configurationGroupMap = compileGroupPrefixTokenMap_();
  var configControlSheet    = getConfigSheet_();
  var globalMaxLastRow      = sheet.getLastRow();
  if (globalMaxLastRow < DATALAYER_START_ROW) return;

  var functionalBrandBlock  = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE, globalMaxLastRow - DATALAYER_START_ROW + 1, 1).getValues();
  var systemicIndicesBlock  = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX, globalMaxLastRow - DATALAYER_START_ROW + 1, 1).getValues();
  var crossSourceIdsBlock   = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID, globalMaxLastRow - DATALAYER_START_ROW + 1, 1).getValues();

  var structuralHighWatermarkTrackingCache = {};
  var sourceIdToSequenceIndexMatrixMap     = {};

  for (var i = 0; i < functionalBrandBlock.length; i++) {
    var conceptualGroupKey = String(functionalBrandBlock[i][0]).trim();
    var functionalSourceId = String(crossSourceIdsBlock[i][0]).trim();
    var serializationIndex = String(systemicIndicesBlock[i][0]).trim();

    if (functionalSourceId && serializationIndex) {
      sourceIdToSequenceIndexMatrixMap[functionalSourceId] = serializationIndex;
    }

    if (!conceptualGroupKey || !configurationGroupMap[conceptualGroupKey]) continue;
    var localizedPrefixCode = configurationGroupMap[conceptualGroupKey].Prefix_Code;
    
    if (serializationIndex.indexOf(localizedPrefixCode) === 0) {
      var isolatedNumericSuffix = parseInt(serializationIndex.substring(localizedPrefixCode.length), 10);
      if (!isNaN(isolatedNumericSuffix)) {
        structuralHighWatermarkTrackingCache[conceptualGroupKey] = Math.max(structuralHighWatermarkTrackingCache[conceptualGroupKey] || 0, isolatedNumericSuffix);
      }
    }
  }

  var pendingConfigCommitmentsMap = {}; 

  for (var j = 0; j < targetedRowsArray.length; j++) {
    var contextualActiveRowIndex = targetedRowsArray[j];
    var transactionalSourceId = String(sheet.getRange(contextualActiveRowIndex, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID).getValue()).trim();
    var evaluationGroupKey    = String(sheet.getRange(contextualActiveRowIndex, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE).getValue()).trim();
    if (!evaluationGroupKey || !configurationGroupMap[evaluationGroupKey]) continue;

    var terminalAssignedSequenceToken = "";
    if (transactionalSourceId && sourceIdToSequenceIndexMatrixMap[transactionalSourceId]) {
      terminalAssignedSequenceToken = sourceIdToSequenceIndexMatrixMap[transactionalSourceId];
    } else {
      var structuralPrefixToken = configurationGroupMap[evaluationGroupKey].Prefix_Code;
      if (structuralHighWatermarkTrackingCache[evaluationGroupKey] === undefined) {
          structuralHighWatermarkTrackingCache[evaluationGroupKey] = Math.max(lookupHistoricalMaximumSequenceBoundaries_(structuralPrefixToken), configurationGroupMap[evaluationGroupKey].Sequence_Max);
      }
      var generatedIncrementalSequenceInteger = structuralHighWatermarkTrackingCache[evaluationGroupKey] + 1;
      structuralHighWatermarkTrackingCache[evaluationGroupKey] = generatedIncrementalSequenceInteger;
      
      terminalAssignedSequenceToken = structuralPrefixToken + generatedIncrementalSequenceInteger;
      if (transactionalSourceId) {
        sourceIdToSequenceIndexMatrixMap[transactionalSourceId] = terminalAssignedSequenceToken;
      }
      pendingConfigCommitmentsMap[evaluationGroupKey] = generatedIncrementalSequenceInteger;
    }

    sheet.getRange(contextualActiveRowIndex, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX).setValue(terminalAssignedSequenceToken);
  }

  for (var uncommittedGroupKey in pendingConfigCommitmentsMap) {
    configControlSheet.getRange(configurationGroupMap[uncommittedGroupKey].configSheetRowIndex, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max)
                       .setValue(pendingConfigCommitmentsMap[uncommittedGroupKey]);
  }
}

function recompressInternalSystemIndicesg_(sheet, structuralFilterTargetGroupKey) {
  var configurationGroupMap = compileGroupPrefixTokenMap_();
  var configControlSheet    = getConfigSheet_();
  var dataBoundRowIndex     = sheet.getLastRow();
  if (dataBoundRowIndex < DATALAYER_START_ROW) return;

  var structuralScopeLength   = dataBoundRowIndex - DATALAYER_START_ROW + 1;
  var evaluationGroupMatrix   = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE, structuralScopeLength, 1).getValues();
  var activeSequenceArray     = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX, structuralScopeLength, 1).getValues();
  var verificationSourceIds   = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID, structuralScopeLength, 1).getValues();

  var processingTargetBucketAllocationMap = {};
  for (var i = 0; i < structuralScopeLength; i++) {
    var iteratingGroupKey = String(evaluationGroupMatrix[i][0]).trim();
    if (!iteratingGroupKey || !configurationGroupMap[iteratingGroupKey]) continue;
    if (structuralFilterTargetGroupKey && iteratingGroupKey !== structuralFilterTargetGroupKey) continue;
    if (!processingTargetBucketAllocationMap[iteratingGroupKey]) processingTargetBucketAllocationMap[iteratingGroupKey] = [];
    processingTargetBucketAllocationMap[iteratingGroupKey].push(i); 
  }

  for (var targetGroupTokenKey in processingTargetBucketAllocationMap) {
    var prefixCharacterToken = configurationGroupMap[targetGroupTokenKey].Prefix_Code;
    var relativeIndicesArray = processingTargetBucketAllocationMap[targetGroupTokenKey];
    
    var minimumFoundSequenceNumber = Infinity;
    for (var k = 0; k < relativeIndicesArray.length; k++) {
      var evaluationSequenceString = String(activeSequenceArray[relativeIndicesArray[k]][0]).trim();
      if (evaluationSequenceString.indexOf(prefixCharacterToken) === 0) {
        var sequenceDigitParseResult = parseInt(evaluationSequenceString.substring(prefixCharacterToken.length), 10);
        if (!isNaN(sequenceDigitParseResult) && sequenceDigitParseResult > 0) minimumFoundSequenceNumber = Math.min(minimumFoundSequenceNumber, sequenceDigitParseResult);
      }
    }
    
    var historicalDatabaseBaselineMax = lookupHistoricalMaximumSequenceBoundaries_(prefixCharacterToken);
    var recalculationSeedValue = Math.max(historicalDatabaseBaselineMax, minimumFoundSequenceNumber === Infinity ? 0 : minimumFoundSequenceNumber - 1);
    
    var activePassStructuralMap = {};

    for (var j = 0; j < relativeIndicesArray.length; j++) {
      var baselineTargetRowRelativeOffsetIndex = relativeIndicesArray[j];
      var trackingContextSourceId = String(verificationSourceIds[baselineTargetRowRelativeOffsetIndex][0]).trim();
      var calculatedAssignedSequenceInteger;
      
      if (trackingContextSourceId && activePassStructuralMap[trackingContextSourceId]) {
        calculatedAssignedSequenceInteger = activePassStructuralMap[trackingContextSourceId];
      } else {
        recalculationSeedValue++;
        calculatedAssignedSequenceInteger = recalculationSeedValue;
        if (trackingContextSourceId) {
          activePassStructuralMap[trackingContextSourceId] = calculatedAssignedSequenceInteger;
        }
      }
      
      activeSequenceArray[baselineTargetRowRelativeOffsetIndex][0] = prefixCharacterToken + calculatedAssignedSequenceInteger;
    }

    configControlSheet.getRange(configurationGroupMap[targetGroupTokenKey].configSheetRowIndex, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max).setValue(recalculationSeedValue);
  }

  sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX, structuralScopeLength, 1).setValues(activeSequenceArray);
}

function regenerateAllInternalOrderNos() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;
  recompressInternalSystemIndicesg_(sheet, null);
  generateSystemFeedbackNotification_('Sequence Alignment Maintained', 'Sequential reference metrics recalculated with absolute compaction criteria.', 'success');
}

function overrideSequenceCascadingCalculations_(sheet, sourceModifiedRowIndex) {
  var configurationGroupMap = compileGroupPrefixTokenMap_();
  var contextualRowGroupKey = String(sheet.getRange(sourceModifiedRowIndex, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE).getValue()).trim();
  if (!contextualRowGroupKey || !configurationGroupMap[contextualRowGroupKey]) return;
  
  var modernAlteredSequenceTokenValue = String(sheet.getRange(sourceModifiedRowIndex, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX).getValue()).trim();
  var alphaCharacterCodePrefix = configurationGroupMap[contextualRowGroupKey].Prefix_Code;
  if (modernAlteredSequenceTokenValue.indexOf(alphaCharacterCodePrefix) !== 0) return; 
  
  var coreIntegerNumericalSeed = parseInt(modernAlteredSequenceTokenValue.substring(alphaCharacterCodePrefix.length), 10);
  if (isNaN(coreIntegerNumericalSeed)) return;
  
  var completeWorksheetRowLimit = sheet.getLastRow();
  if (completeWorksheetRowLimit <= sourceModifiedRowIndex) {
    var configControlSheet = getConfigSheet_();
    var runtimeConfigMaxBoundVal = Number(configControlSheet.getRange(configurationGroupMap[contextualRowGroupKey].configSheetRowIndex, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max).getValue()) || 0;
    if (coreIntegerNumericalSeed > runtimeConfigMaxBoundVal) {
      configControlSheet.getRange(configurationGroupMap[contextualRowGroupKey].configSheetRowIndex, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max).setValue(coreIntegerNumericalSeed);
    }
    return;
  }
  
  var parsingScopeLength = completeWorksheetRowLimit - sourceModifiedRowIndex;
  var localGroupDataValues    = sheet.getRange(sourceModifiedRowIndex + 1, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE, parsingScopeLength, 1).getValues();
  var localSourceMappingKeys  = sheet.getRange(sourceModifiedRowIndex + 1, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID, parsingScopeLength, 1).getValues();
  var comprehensiveSequenceTargetCells = sheet.getRange(sourceModifiedRowIndex + 1, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX, parsingScopeLength, 1).getValues();
  
  var sequenceTrackingIncrementalWatermark = coreIntegerNumericalSeed;
  var memoryReferenceCrossMap = {};
  var analyticalOriginSourceKey = String(sheet.getRange(sourceModifiedRowIndex, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID).getValue()).trim();
  if (analyticalOriginSourceKey) {
    memoryReferenceCrossMap[analyticalOriginSourceKey] = coreIntegerNumericalSeed;
  }

  for (var i = 0; i < parsingScopeLength; i++) {
    var evaluationRowGroupToken = String(localGroupDataValues[i][0]).trim();
    if (evaluationRowGroupToken !== contextualRowGroupKey) continue;
    
    var dynamicSourceRowKey = String(localSourceMappingKeys[i][0]).trim();
    var evaluatedTargetSequenceInteger;
    
    if (dynamicSourceRowKey && memoryReferenceCrossMap[dynamicSourceRowKey]) {
      evaluatedTargetSequenceInteger = memoryReferenceCrossMap[dynamicSourceRowKey];
    } else {
      sequenceTrackingIncrementalWatermark++;
      evaluatedTargetSequenceInteger = sequenceTrackingIncrementalWatermark;
      if (dynamicSourceRowKey) {
        memoryReferenceCrossMap[dynamicSourceRowKey] = evaluatedTargetSequenceInteger;
      }
    }
    comprehensiveSequenceTargetCells[i][0] = alphaCharacterCodePrefix + evaluatedTargetSequenceInteger;
  }
  
  sheet.getRange(sourceModifiedRowIndex + 1, COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX, parsingScopeLength, 1).setValues(comprehensiveSequenceTargetCells);
  
  var configControlSheet = getConfigSheet_();
  var runtimeConfigMaxBoundVal = Number(configControlSheet.getRange(configurationGroupMap[contextualRowGroupKey].configSheetRowIndex, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max).getValue()) || 0;
  if (sequenceTrackingIncrementalWatermark > runtimeConfigMaxBoundVal) {
    configControlSheet.getRange(configurationGroupMap[contextualRowGroupKey].configSheetRowIndex, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max).setValue(sequenceTrackingIncrementalWatermark);
  }
}


// ─────────────────────────────────────────────────────────────────────────────
//  7. ALGORITHMIC ASSET FINANCIAL PROJECTIONS
// ─────────────────────────────────────────────────────────────────────────────

var _networkExchangeRatesCachePool = {};

function requestLiveCurrencyMultiplierMetric_(currencyTargetString) {
  var validatedTokenCode = String(currencyTargetString).trim().toUpperCase();
  if (!validatedTokenCode) return 0;
  if (validatedTokenCode === 'INR') return 1;
  if (_networkExchangeRatesCachePool[validatedTokenCode]) return _networkExchangeRatesCachePool[validatedTokenCode];
  
  try {
    var dataPayloadServerResponse = UrlFetchApp.fetch("https://api.exchangerate-api.com/v4/latest/" + validatedTokenCode);
    var configurationJsonObject = JSON.parse(dataPayloadServerResponse.getContentText());
    if (configurationJsonObject && configurationJsonObject.rates && configurationJsonObject.rates['INR']) {
      var targetedRateMultiplier = configurationJsonObject.rates['INR'];
      _networkExchangeRatesCachePool[validatedTokenCode] = targetedRateMultiplier;
      return targetedRateMultiplier;
    }
  } catch (e) {
    // Network logging fallback interface
  }
  return 0;
}

function processDynamicRowFinancialCalculations_(sheet, targetRowsArray) {
  if (!targetRowsArray || targetRowsArray.length === 0) return;

  var geographicPricingConfigMap = compileGeographicPricingMap_();

  for (var i = 0; i < targetRowsArray.length; i++) {
    var structuralActiveTargetRowIndex = targetRowsArray[i];

    var baselineCurrencyKey = String(sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.MONETARY_LABEL).getValue()).trim();
    var targetLocationZone  = String(sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.REGIONAL_ZONE_PROFILE).getValue()).trim();
    var individualUnitCost  = Number(sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.ASSET_COST_STANDARD).getValue()) || 0;

    if (!baselineCurrencyKey && !targetLocationZone && individualUnitCost === 0) {
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.LOCALIZED_NORMALIZATION).setValue("");
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.OPERATIONAL_FREIGHT).setValue("");
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.COMPUTED_VALUE_LIMIT).setValue("");
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.FUNCTIONAL_COST).setValue("");
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.OPTIMIZATION_MARGIN).setValue("");
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.TARGETED_NET_YIELD).setValue("");
      continue;
    }

    var baseStatedCurrencyPrice   = Number(sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.CURRENCY_PRICE).getValue()) || 0;
    var parsingConversionRateCell = sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.STANDARD_RATIO).getValue();
    var evaluatedCoefficientValue = Number(parsingConversionRateCell);

    if (!evaluatedCoefficientValue || isNaN(evaluatedCoefficientValue)) {
      evaluatedCoefficientValue = requestLiveCurrencyMultiplierMetric_(baselineCurrencyKey);
      sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.STANDARD_RATIO).setValue(evaluatedCoefficientValue);
    }
    
    var standardFreightChargeInputValue = Number(sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.FREIGHT_SURCHARGE).getValue()) || 0;
    var operationalQuantityVolumeUnits  = Number(sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.QUANTITY_UNITS).getValue()) || 1;

    var systemicRegionalProfilePricingRecord = geographicPricingConfigMap[targetLocationZone] || { Freight_Fee: 0, Margin_Factor: 0 };
    var allocatedLogisticalOverheadProductCharge = systemicRegionalProfilePricingRecord.Freight_Fee;

    var evaluationNormalizedPriceMetric = baseStatedCurrencyPrice * evaluatedCoefficientValue;
    var calculatedTheoreticalExpenseMax = (individualUnitCost * operationalQuantityVolumeUnits) + allocatedLogisticalOverheadProductCharge;
    var calculatedRealizedOperationalExpense = (individualUnitCost * operationalQuantityVolumeUnits) + standardFreightChargeInputValue;
    var calculatedTheoreticalMarginThreshold = evaluationNormalizedPriceMetric - calculatedTheoreticalExpenseMax;
    var calculatedNetFinancialRealizedYield  = evaluationNormalizedPriceMetric - calculatedRealizedOperationalExpense;

    sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.LOCALIZED_NORMALIZATION).setValue(evaluationNormalizedPriceMetric);
    sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.OPERATIONAL_FREIGHT).setValue(allocatedLogisticalOverheadProductCharge);
    sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.COMPUTED_VALUE_LIMIT).setValue(calculatedTheoreticalExpenseMax);
    sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.FUNCTIONAL_COST).setValue(calculatedRealizedOperationalExpense);
    sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.OPTIMIZATION_MARGIN).setValue(calculatedTheoreticalMarginThreshold);
    sheet.getRange(structuralActiveTargetRowIndex, COLUMN_SCHEMA_MAP.TARGETED_NET_YIELD).setValue(calculatedNetFinancialRealizedYield);
  }
}

function dynamicMatrixFinancialCalculationsExecutionPipeline_(sheet, calculationStartRowIndex, calculationEndRowIndex) {
  var matrixRowsProcessingScopeLength = calculationEndRowIndex - calculationStartRowIndex + 1;
  if (matrixRowsProcessingScopeLength <= 0) return;

  var geographicPricingConfigMap = compileGeographicPricingMap_();

  var rawCurrencyPricesCacheArray = sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.CURRENCY_PRICE, matrixRowsProcessingScopeLength, 1).getValues();
  var rawStandardRatiosCacheArray = sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.STANDARD_RATIO, matrixRowsProcessingScopeLength, 1).getValues();
  var rawAssetCostsCacheArray     = sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.ASSET_COST_STANDARD, matrixRowsProcessingScopeLength, 1).getValues();
  var rawFreightChargesCacheArray = sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.FREIGHT_SURCHARGE, matrixRowsProcessingScopeLength, 1).getValues();
  var rawGeographicZonesCacheArray= sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.REGIONAL_ZONE_PROFILE, matrixRowsProcessingScopeLength, 1).getValues();
  var rawQuantityUnitsCacheArray  = sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.QUANTITY_UNITS, matrixRowsProcessingScopeLength, 1).getValues();
  var rawMonetaryLabelsCacheArray = sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.MONETARY_LABEL, matrixRowsProcessingScopeLength, 1).getValues();

  var trackingNormalizedPriceBuffer  = [];
  var trackingFreightOverheadBuffer  = [];
  var trackingValueLimitBuffer       = [];
  var trackingFunctionalCostBuffer   = [];
  var trackingOptimizationMarginBuffer = [];
  var trackingTargetYieldBuffer      = [];
  var trackingRatioUpdatesBuffer     = [];

  for (var i = 0; i < matrixRowsProcessingScopeLength; i++) {
    var functionalCurrencyCodeString = String(rawMonetaryLabelsCacheArray[i][0]).trim();
    var functionalRegionalZoneProfileString = String(rawGeographicZonesCacheArray[i][0]).trim();
    var computationalAssetCostStandardAmount = Number(rawAssetCostsCacheArray[i][0]) || 0;

    if (!functionalCurrencyCodeString && !functionalRegionalZoneProfileString && computationalAssetCostStandardAmount === 0) {
      trackingRatioUpdatesBuffer.push(['']);
      trackingNormalizedPriceBuffer.push(['']);
      trackingFreightOverheadBuffer.push(['']);
      trackingValueLimitBuffer.push(['']);
      trackingFunctionalCostBuffer.push(['']);
      trackingOptimizationMarginBuffer.push(['']);
      trackingTargetYieldBuffer.push(['']);
      continue;
    }

    var parsingStatedCurrencyPriceValue = Number(rawCurrencyPricesCacheArray[i][0]) || 0;
    var parsingSystemicRatioCoefficient  = Number(rawStandardRatiosCacheArray[i][0]);
    
    if (!parsingSystemicRatioCoefficient || isNaN(parsingSystemicRatioCoefficient)) {
      parsingSystemicRatioCoefficient = requestLiveCurrencyMultiplierMetric_(functionalCurrencyCodeString);
      trackingRatioUpdatesBuffer.push([parsingSystemicRatioCoefficient]);
    } else {
      trackingRatioUpdatesBuffer.push([parsingSystemicRatioCoefficient]);
    }

    var parsingFreightSurchargeInputValue = Number(rawFreightChargesCacheArray[i][0]) || 0;
    var parsingVolumeQuantityUnitsCount   = Number(rawQuantityUnitsCacheArray[i][0]) || 1;

    var iterativeRegionalPricingProfileRecord = geographicPricingConfigMap[functionalRegionalZoneProfileString] || { Freight_Fee: 0 };
    var resolvedFreightOverheadProductCharge  = iterativeRegionalPricingProfileRecord.Freight_Fee;

    var outputNormalizedPriceCalculated = parsingStatedCurrencyPriceValue * parsingSystemicRatioCoefficient;
    var outputComputedValueLimitExpense = (computationalAssetCostStandardAmount * parsingVolumeQuantityUnitsCount) + resolvedFreightOverheadProductCharge;
    var outputFunctionalCostExpense     = (computationalAssetCostStandardAmount * parsingVolumeQuantityUnitsCount) + parsingFreightSurchargeInputValue;
    var outputOptimizationMarginYield   = outputNormalizedPriceCalculated - outputComputedValueLimitExpense;
    var outputTargetedNetYield          = outputNormalizedPriceCalculated - outputFunctionalCostExpense;

    trackingNormalizedPriceBuffer.push([outputNormalizedPriceCalculated]);
    trackingFreightOverheadBuffer.push([resolvedFreightOverheadProductCharge]);
    trackingValueLimitBuffer.push([outputComputedValueLimitExpense]);
    trackingFunctionalCostBuffer.push([outputFunctionalCostExpense]);
    trackingOptimizationMarginBuffer.push([outputOptimizationMarginYield]);
    trackingTargetYieldBuffer.push([outputTargetedNetYield]);
  }

  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.STANDARD_RATIO, matrixRowsProcessingScopeLength, 1).setValues(trackingRatioUpdatesBuffer);
  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.LOCALIZED_NORMALIZATION, matrixRowsProcessingScopeLength, 1).setValues(trackingNormalizedPriceBuffer);
  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.OPERATIONAL_FREIGHT, matrixRowsProcessingScopeLength, 1).setValues(trackingFreightOverheadBuffer);
  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.COMPUTED_VALUE_LIMIT, matrixRowsProcessingScopeLength, 1).setValues(trackingValueLimitBuffer);
  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.FUNCTIONAL_COST, matrixRowsProcessingScopeLength, 1).setValues(trackingFunctionalCostBuffer);
  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.OPTIMIZATION_MARGIN, matrixRowsProcessingScopeLength, 1).setValues(trackingOptimizationMarginBuffer);
  sheet.getRange(calculationStartRowIndex, COLUMN_SCHEMA_MAP.TARGETED_NET_YIELD, matrixRowsProcessingScopeLength, 1).setValues(trackingTargetYieldBuffer);
}


// ─────────────────────────────────────────────────────────────────────────────
//  8. APPEND OPERATIONS TARGETING MASTER REPOSITORY DATABASE
// ─────────────────────────────────────────────────────────────────────────────

function queryMasterDatasetPrimaryKeysCollection_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var destinationSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.MASTER_DATABASE);
  if (!destinationSheet) return {};
  var totalRows = destinationSheet.getLastRow();
  if (totalRows < 2) return {};
  var primaryKeysArray = destinationSheet.getRange(2, 1, totalRows - 1, 1).getValues();
  var uniqueIdentitiesHashTable = {};
  for (var i = 0; i < primaryKeysArray.length; i++) {
    var functionalKeyString = String(primaryKeysArray[i][0]).trim();
    if (functionalKeyString) uniqueIdentitiesHashTable[functionalKeyString] = true;
  }
  return uniqueIdentitiesHashTable;
}

function appendSelectedToAllOrders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;

  var activeUserSelectionRange = ss.getActiveRange();
  if (!activeUserSelectionRange) {
    generateSystemFeedbackNotification_('Selection Boundaries Ambiguous', 'Identify rows targeted for ledger injection by highlighting them.', 'warning');
    return;
  }

  var processingStartRowIndex = Math.max(activeUserSelectionRange.getRow(), DATALAYER_START_ROW);
  var processingEndRowIndex   = activeUserSelectionRange.getLastRow();
  if (processingEndRowIndex < DATALAYER_START_ROW) {
    generateSystemFeedbackNotification_('Out of Data Bounds', 'Target data array rows explicitly, ignoring structural heading descriptions.', 'warning');
    return;
  }

  evaluateStagingRowsComplianceLogs_(sheet, processingStartRowIndex, processingEndRowIndex);

  var structuralScopeLength = processingEndRowIndex - processingStartRowIndex + 1;
  var bulkExtractedDataValuesBlock = sheet.getRange(processingStartRowIndex, 1, structuralScopeLength, COLUMN_LIMIT_BOUNDARY).getValues();

  var trackingMasterIdentifiersMap = queryMasterDatasetPrimaryKeysCollection_();
  var collisionInterceptionsCollection = [];
  var validStagingRowIndicesCollection = [];
  var recordsPendingCommitmentBuffer   = [];
  var targetRowIndexesMarkedForCollision = [];

  for (var i = 0; i < structuralScopeLength; i++) {
    var rowTrackingSourceRecordId = String(bulkExtractedDataValuesBlock[i][COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID - 1]).trim();
    var evaluatedRowHealthStatusString = String(bulkExtractedDataValuesBlock[i][COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG - 1]).trim();

    if (!rowTrackingSourceRecordId) {
      collisionInterceptionsCollection.push({ row: processingStartRowIndex + i, id: '(null)', reason: 'Source Record Identifier Undefined' });
      continue;
    }
    if (evaluatedRowHealthStatusString !== '✅ Validation Integrity Maintained') {
      collisionInterceptionsCollection.push({ row: processingStartRowIndex + i, id: rowTrackingSourceRecordId, reason: 'Compliance Standard Breached: ' + evaluatedRowHealthStatusString });
      continue;
    }

    if (trackingMasterIdentifiersMap[rowTrackingSourceRecordId]) {
      collisionInterceptionsCollection.push({ row: processingStartRowIndex + i, id: rowTrackingSourceRecordId, reason: 'Record identity matches legacy system entries.' });
      targetRowIndexesMarkedForCollision.push(processingStartRowIndex + i);
    } else {
      validStagingRowIndicesCollection.push(processingStartRowIndex + i);
      recordsPendingCommitmentBuffer.push(bulkExtractedDataValuesBlock[i]);
    }
  }

  for (var d = 0; d < targetRowIndexesMarkedForCollision.length; d++) {
    sheet.getRange(targetRowIndexesMarkedForCollision[d], COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG).setValue("Identified Duplicate Record Conflict");
  }

  if (collisionInterceptionsCollection.length > 0 && recordsPendingCommitmentBuffer.length === 0) {
    renderValidationInterceptionModal_(collisionInterceptionsCollection);
    return;
  }

  if (collisionInterceptionsCollection.length > 0) {
    PropertiesService.getScriptProperties().setProperty('PENDING_STAGE_COMMIT_START_PTR', String(processingStartRowIndex));
    PropertiesService.getScriptProperties().setProperty('PENDING_STAGE_COMMIT_END_PTR', String(processingEndRowIndex));
    renderPartialCollisionResolutionModal_(recordsPendingCommitmentBuffer, collisionInterceptionsCollection);
    return;
  }

  PropertiesService.getScriptProperties().setProperty('PENDING_STAGE_COMMIT_START_PTR', String(processingStartRowIndex));
  PropertiesService.getScriptProperties().setProperty('PENDING_STAGE_COMMIT_END_PTR', String(processingEndRowIndex));
  renderCommitConfirmationModal_(recordsPendingCommitmentBuffer, structuralScopeLength);
}

function appendAllToAllOrders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;

  var currentMaxWorksheetRowIndex = sheet.getLastRow();
  if (currentMaxWorksheetRowIndex < DATALAYER_START_ROW) {
    generateSystemFeedbackNotification_('Data Target Matrix Vacant', 'Staging repository contains no transaction lines awaiting operations.', 'info');
    return;
  }

  var optimizationStartRowIndex = DATALAYER_START_ROW;
  var optimizationEndRowIndex   = currentMaxWorksheetRowIndex;
  
  evaluateStagingRowsComplianceLogs_(sheet, optimizationStartRowIndex, optimizationEndRowIndex);

  var internalScopeLength = optimizationEndRowIndex - optimizationStartRowIndex + 1;
  var globallyExtractedStagingMatrix = sheet.getRange(optimizationStartRowIndex, 1, internalScopeLength, COLUMN_LIMIT_BOUNDARY).getValues();

  var trackingMasterIdentifiersMap = queryMasterDatasetPrimaryKeysCollection_();
  var collisionInterceptionsCollection = [];
  var recordsPendingCommitmentBuffer   = [];
  var targetRowIndexesMarkedForCollision = [];

  for (var i = 0; i < internalScopeLength; i++) {
    var parsingRowIntegrityCheckString = globallyExtractedStagingMatrix[i].join('').trim();
    if (parsingRowIntegrityCheckString === '') continue; 

    var sourceTrackingRecordId = String(globallyExtractedStagingMatrix[i][COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID - 1]).trim();
    var internalEvaluationLogString = String(globallyExtractedStagingMatrix[i][COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG - 1]).trim();

    if (!sourceTrackingRecordId) {
      collisionInterceptionsCollection.push({ row: optimizationStartRowIndex + i, id: '(null)', reason: 'Source Record Identifier Undefined' });
      continue;
    }
    if (internalEvaluationLogString !== '✅ Validation Integrity Maintained') {
      collisionInterceptionsCollection.push({ row: optimizationStartRowIndex + i, id: sourceTrackingRecordId, reason: 'Compliance Standard Breached: ' + internalEvaluationLogString });
      continue;
    }

    if (trackingMasterIdentifiersMap[sourceTrackingRecordId]) {
      collisionInterceptionsCollection.push({ row: optimizationStartRowIndex + i, id: sourceTrackingRecordId, reason: 'Record identity matches legacy system entries.' });
      targetRowIndexesMarkedForCollision.push(optimizationStartRowIndex + i);
    } else {
      recordsPendingCommitmentBuffer.push(globallyExtractedStagingMatrix[i]);
    }
  }

  for (var d = 0; d < targetRowIndexesMarkedForCollision.length; d++) {
    sheet.getRange(targetRowIndexesMarkedForCollision[d], COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG).setValue("Identified Duplicate Record Conflict");
  }

  if (recordsPendingCommitmentBuffer.length === 0) {
    if (collisionInterceptionsCollection.length > 0) {
      renderValidationInterceptionModal_(collisionInterceptionsCollection);
    } else {
      generateSystemFeedbackNotification_('Data Target Matrix Vacant', 'No transactional datasets met operational security clearing requirements.', 'info');
    }
    return;
  }

  PropertiesService.getScriptProperties().setProperty('PENDING_STAGE_COMMIT_START_PTR', String(optimizationStartRowIndex));
  PropertiesService.getScriptProperties().setProperty('PENDING_STAGE_COMMIT_END_PTR', String(optimizationEndRowIndex));

  if (collisionInterceptionsCollection.length > 0) {
    renderPartialCollisionResolutionModal_(recordsPendingCommitmentBuffer, collisionInterceptionsCollection);
    return;
  }

  renderCommitConfirmationModal_(recordsPendingCommitmentBuffer, recordsPendingCommitmentBuffer.length);
}

function commitSelectiveClearedStagingRecords() {
  var globalPropertiesRef = PropertiesService.getScriptProperties();
  var resolvedStartPointer = Number(globalPropertiesRef.getProperty('PENDING_STAGE_COMMIT_START_PTR'));
  var resolvedEndPointer   = Number(globalPropertiesRef.getProperty('PENDING_STAGE_COMMIT_END_PTR'));

  if (!resolvedStartPointer || !resolvedEndPointer) return;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var stagingSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  var repositorySheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.MASTER_DATABASE);
  if (!stagingSheet || !repositorySheet) return;

  var executionScopeLength = resolvedEndPointer - resolvedStartPointer + 1;
  var valuesExtractionBlockCache = stagingSheet.getRange(resolvedStartPointer, 1, executionScopeLength, COLUMN_LIMIT_BOUNDARY).getValues();
  var historicalMasterIdentifiersCollection = queryMasterDatasetPrimaryKeysCollection_();
  var outputCommittedCounter = 0;

  for (var i = 0; i < executionScopeLength; i++) {
    var stagingRecordPrimaryKeyToken = String(valuesExtractionBlockCache[i][COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID - 1]).trim();
    if (stagingRecordPrimaryKeyToken && !historicalMasterIdentifiersCollection[stagingRecordPrimaryKeyToken]) {
      repositorySheet.appendRow(valuesExtractionBlockCache[i].slice(0, 40)); 
      outputCommittedCounter++;
    }
  }

  globalPropertiesRef.deleteProperty('PENDING_STAGE_COMMIT_START_PTR');
  globalPropertiesRef.deleteProperty('PENDING_STAGE_COMMIT_END_PTR');
}

function commitGlobalClearedStagingRecords() {
  var globalPropertiesRef = PropertiesService.getScriptProperties();
  var resolvedStartPointer = Number(globalPropertiesRef.getProperty('PENDING_STAGE_COMMIT_START_PTR'));
  var resolvedEndPointer   = Number(globalPropertiesRef.getProperty('PENDING_STAGE_COMMIT_END_PTR'));

  if (!resolvedStartPointer || !resolvedEndPointer) return;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var stagingSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  var repositorySheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.MASTER_DATABASE);
  if (!stagingSheet || !repositorySheet) return;

  var executionScopeLength = resolvedEndPointer - resolvedStartPointer + 1;
  var valuesExtractionBlockCache = stagingSheet.getRange(resolvedStartPointer, 1, executionScopeLength, COLUMN_LIMIT_BOUNDARY).getValues();

  for (var i = 0; i < executionScopeLength; i++) {
    var primaryVerificationKey = String(valuesExtractionBlockCache[i][COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID - 1]).trim();
    if (primaryVerificationKey) {
      repositorySheet.appendRow(valuesExtractionBlockCache[i].slice(0, 40)); 
    }
  }

  globalPropertiesRef.deleteProperty('PENDING_STAGE_COMMIT_START_PTR');
  globalPropertiesRef.deleteProperty('PENDING_STAGE_COMMIT_END_PTR');
}

function renderValidationInterceptionModal_(collisionsArray) {
  var diagnosticTableRowsHtml = '';
  for (var i = 0; i < collisionsArray.length; i++) {
    diagnosticTableRowsHtml += '<tr>'
      + '<td style="padding:8px 12px;border-bottom:1px solid #ffcdd2;font-size:13px;color:#c62828;">Row ' + collisionsArray[i].row + '</td>'
      + '<td style="padding:8px 12px;border-bottom:1px solid #ffcdd2;font-size:13px;font-weight:600;">' + collisionsArray[i].id + '</td>'
      + '<td style="padding:8px 12px;border-bottom:1px solid #ffcdd2;font-size:13px;max-width:200px;word-wrap:break-word;">' + collisionsArray[i].reason + '</td>'
      + '</tr>';
  }

  var comprehensiveModalShellHtml = compileDynamicInterfaceTemplateShell_(
    '🚫 Transmission Terminated — Validation Failures Detected',
    'linear-gradient(135deg, #c62828, #e53935)',
    '<table style="width:100%;border-collapse:collapse;">'
    + '<thead><tr style="background:#ffebee;">'
    + '<th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#c62828;">Row Index</th>'
    + '<th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#c62828;">Entity Key</th>'
    + '<th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#c62828;">Intercept Objective</th>'
    + '</tr></thead><tbody>' + diagnosticTableRowsHtml + '</tbody></table>'
    + '<div style="margin-top:14px;padding:12px 16px;background:#ffebee;border-left:4px solid #c62828;'
    + 'border-radius:6px;font-size:13px;color:#b71c1c;">'
    + '❌ <strong>Target parameters violated compliance system rule sets.</strong><br>Analyze diagnostic tracking statements detailed above. Data mutation locked.</div>',
    '<button class="btn" style="background:linear-gradient(135deg,#757575,#9e9e9e);" onclick="google.script.host.close()">Dismiss Window</button>'
  );

  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(comprehensiveModalShellHtml).setWidth(540).setHeight(380), ' '
  );
}

function renderPartialCollisionResolutionModal_(clearedDataBlock, collisionsArray) {
  var diagnosticTableRowsHtml = '';
  for (var i = 0; i < collisionsArray.length; i++) {
    diagnosticTableRowsHtml += '<tr>'
      + '<td style="padding:6px 10px;border-bottom:1px solid #ffcdd2;font-size:12px;">Row ' + collisionsArray[i].row + '</td>'
      + '<td style="padding:6px 10px;border-bottom:1px solid #ffcdd2;font-size:12px;font-weight:600;">' + collisionsArray[i].id + '</td>'
      + '<td style="padding:6px 10px;border-bottom:1px solid #ffcdd2;font-size:12px;">'
      + '<span title="' + collisionsArray[i].reason.replace(/"/g, '&quot;') + '" style="background:#ffcdd2;color:#c62828;padding:2px 8px;border-radius:10px;font-size:11px;cursor:help;display:inline-block;max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' 
      + collisionsArray[i].reason + '</span></td>'
      + '</tr>';
  }

  var metricsSummaryDashboardHtml = '<div style="display:flex;gap:16px;margin-bottom:12px;">'
    + '<div style="flex:1;background:#e8f5e9;padding:12px;border-radius:10px;text-align:center;">'
    + '<div style="font-size:28px;font-weight:700;color:#2e7d32;">' + clearedDataBlock.length + '</div>'
    + '<div style="font-size:11px;color:#558b2f;text-transform:uppercase;letter-spacing:0.5px;">Cleared Data Sets</div></div>'
    + '<div style="flex:1;background:#ffebee;padding:12px;border-radius:10px;text-align:center;">'
    + '<div style="font-size:28px;font-weight:700;color:#c62828;">' + collisionsArray.length + '</div>'
    + '<div style="font-size:11px;color:#b71c1c;text-transform:uppercase;letter-spacing:0.5px;">Intercepted Line Items</div></div></div>';

  var comprehensiveModalShellHtml = compileDynamicInterfaceTemplateShell_(
    '⚠️ Exception Flag Alert — Partial Matrix Push Configuration',
    'linear-gradient(135deg, #e65100, #ff8f00)',
    metricsSummaryDashboardHtml
    + '<div style="font-size:13px;font-weight:600;color:#616161;margin-bottom:6px;">Anomalous row array components (Will be omitted from transactional commits):</div>'
    + '<table style="width:100%;border-collapse:collapse;table-layout:fixed;">'
    + '<thead><tr><th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#9e9e9e;width:25%;">Index Location</th>'
    + '<th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#9e9e9e;width:30%;">Primary Key Reference</th>'
    + '<th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#9e9e9e;width:45%;">Operational Block State</th>'
    + '</tr></thead><tbody>' + diagnosticTableRowsHtml + '</tbody></table>',
    '<button class="btn" style="background:linear-gradient(135deg,#757575,#9e9e9e);" onclick="google.script.host.close()">Terminate Action</button>'
    + '<button class="btn" style="background:linear-gradient(135deg,#43a047,#66bb6a);margin-left:10px;" '
    + 'onclick="google.script.run.withSuccessHandler(function(){google.script.host.close()}).commitSelectiveClearedStagingRecords()">'
    + 'Deploy ' + clearedDataBlock.length + ' Valid Data Segments</button>'
  );

  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(comprehensiveModalShellHtml).setWidth(540).setHeight(420), ' '
  );
}

function renderCommitConfirmationModal_(clearedDataBlock, displayCountValue) {
  var historicalRecordPreviewDataRowsHtml = '';
  var displayLimitThreshold = Math.min(displayCountValue, 6);
  for (var i = 0; i < displayLimitThreshold; i++) {
    var referenceIdKeyToken = String(clearedDataBlock[i][COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID - 1]).trim() || '—';
    var divisionClassificationKey = String(clearedDataBlock[i][COLUMN_SCHEMA_MAP.ORGANIZATION_CODE - 1]).trim() || '—';
    var functionalIdentitySku     = String(clearedDataBlock[i][COLUMN_SCHEMA_MAP.SKU - 1]).trim() || '—';
    historicalRecordPreviewDataRowsHtml += '<tr>'
      + '<td style="padding:6px 10px;border-bottom:1px solid #e8eaf6;font-size:12px;">' + referenceIdKeyToken + '</td>'
      + '<td style="padding:6px 10px;border-bottom:1px solid #e8eaf6;font-size:12px;">' + divisionClassificationKey + '</td>'
      + '<td style="padding:6px 10px;border-bottom:1px solid #e8eaf6;font-size:12px;">' + functionalIdentitySku + '</td>'
      + '</tr>';
  }
  if (displayCountValue > displayLimitThreshold) {
    historicalRecordPreviewDataRowsHtml += '<tr><td colspan="3" style="padding:8px;text-align:center;color:#9e9e9e;font-size:12px;">'
      + '...and ' + (displayCountValue - displayLimitThreshold) + ' additional cached datasets ready for ingestion.</td></tr>';
  }

  var comprehensiveModalShellHtml = compileDynamicInterfaceTemplateShell_(
    '📋 Authorize Commit Pipeline: Transferring ' + displayCountValue + ' Data Rows',
    'linear-gradient(135deg, #1565c0, #42a5f5)',
    '<div style="background:#e3f2fd;padding:12px;border-radius:10px;text-align:center;margin-bottom:12px;">'
    + '<div style="font-size:32px;font-weight:700;color:#1565c0;">' + displayCountValue + '</div>'
    + '<div style="font-size:12px;color:#1976d2;text-transform:uppercase;letter-spacing:0.5px;">Records Verified and Cleared</div></div>'
    + '<table style="width:100%;border-collapse:collapse;">'
    + '<thead><tr style="background:#e8eaf6;">'
    + '<th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#5c6bc0;">Entity Identifier Key</th>'
    + '<th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#5c6bc0;">Vector Group</th>'
    + '<th style="padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;color:#5c6bc0;">SKU Matrix Allocation</th>'
    + '</tr></thead><tbody>' + historicalRecordPreviewDataRowsHtml + '</tbody></table>'
    + '<div style="margin-top:10px;padding:10px 14px;background:#e8f5e9;border-left:4px solid #43a047;'
    + 'border-radius:6px;font-size:12px;color:#2e7d32;">'
    + '✅ Structural parity test cleared. Zero ledger collisions detected. Operation safe to execute.</div>',
    '<button class="btn" style="background:linear-gradient(135deg,#757575,#9e9e9e);" onclick="google.script.host.close()">Abort Transfer</button>'
    + '<button class="btn" style="background:linear-gradient(135deg,#1565c0,#42a5f5);margin-left:10px;" '
    + 'onclick="google.script.run.withSuccessHandler(function(){google.script.host.close()}).commitGlobalClearedStagingRecords()">'
    + 'Execute Batch Commit Instructions</button>'
  );

  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(comprehensiveModalShellHtml).setWidth(520).setHeight(440), ' '
  );
}

function compileDynamicInterfaceTemplateShell_(interfaceHeaderTitle, visualGradientStyleString, mainBodyPayloadHtml, actionButtonsPayloadHtml) {
  return '<!DOCTYPE html><html><head>'
    + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
    + '<style>'
    + '* { margin:0; padding:0; box-sizing:border-box; }'
    + 'body { font-family:"Inter",sans-serif; background:#f5f5f5; padding:0; }'
    + '.card { background:#fff; border-radius:16px; overflow:hidden;'
    + '  box-shadow:0 8px 32px rgba(0,0,0,0.12); animation:slideUp 0.3s cubic-bezier(0.22,1,0.36,1); }'
    + '.header { background:' + visualGradientStyleString + '; padding:18px 22px; color:#fff; }'
    + '.header h2 { font-size:17px; font-weight:700; letter-spacing:-0.3px; }'
    + '.body { padding:18px 22px; }'
    + '.btn-row { padding:14px 22px; display:flex; gap:10px; justify-content:flex-end; background:#fafafa;'
    + '  border-top:1px solid #f0f0f0; }'
    + '.btn { padding:10px 22px; border:none; border-radius:8px; font-family:"Inter",sans-serif;'
    + '  font-size:13px; font-weight:600; cursor:pointer; color:#fff;'
    + '  transition:transform 0.15s,box-shadow 0.15s; box-shadow:0 4px 12px rgba(0,0,0,0.12); }'
    + '.btn;hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,0.18); }'
    + '@keyframes slideUp { from { opacity:0; transform:translateY(16px); }'
    + '  to { opacity:1; transform:translateY(0); } }'
    + '</style></head><body>'
    + '<div class="card">'
    + '  <div class="header"><h2>' + interfaceHeaderTitle + '</h2></div>'
    + '  <div class="body">' + mainBodyPayloadHtml + '</div>'
    + '  <div class="btn-row">' + actionButtonsPayloadHtml + '</div>'
    + '</div></body></html>';
}


// ─────────────────────────────────────────────────────────────────────────────
//  9. BULK-OPTIMIZED EVENT ROUTE LISTENER
// ─────────────────────────────────────────────────────────────────────────────

function traceHistoricGroupKeyFallbackConfigurations_(sheet, targetRowsArray) {
  var completeWorksheetRowLimit = sheet.getLastRow();
  if (completeWorksheetRowLimit < DATALAYER_START_ROW) return false;
  
  var contextRowsScopeLength = completeWorksheetRowLimit - DATALAYER_START_ROW + 1;
  var globallyExtractedSourceIdMatrix = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID, contextRowsScopeLength, 1).getValues();
  var globallyExtractedGroupKeyMatrix = sheet.getRange(DATALAYER_START_ROW, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE, contextRowsScopeLength, 1).getValues();
  
  var lookupSourceIdToGroupKeyAssociativeMap = {};
  for (var i = 0; i < contextRowsScopeLength; i++) {
    var primarySourceKeyToken = String(globallyExtractedSourceIdMatrix[i][0]).trim();
    var mappingGroupCodeToken  = String(globallyExtractedGroupKeyMatrix[i][0]).trim();
    if (primarySourceKeyToken && mappingGroupCodeToken && !lookupSourceIdToGroupKeyAssociativeMap[primarySourceKeyToken]) {
      lookupSourceIdToGroupKeyAssociativeMap[primarySourceKeyToken] = mappingGroupCodeToken;
    }
  }
  
  var systematicMutationDetectedFlag = false;
  for (var j = 0; j < targetRowsArray.length; j++) {
    var evaluationRowIndex = targetRowsArray[j];
    var contextualSourceIdString = String(sheet.getRange(evaluationRowIndex, COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID).getValue()).trim();
    var preExistingGroupKeyValue = String(sheet.getRange(evaluationRowIndex, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE).getValue()).trim();
    if (contextualSourceIdString && lookupSourceIdToGroupKeyAssociativeMap[contextualSourceIdString] && !preExistingGroupKeyValue) {
      sheet.getRange(evaluationRowIndex, COLUMN_SCHEMA_MAP.ORGANIZATION_CODE).setValue(lookupSourceIdToGroupKeyAssociativeMap[contextualSourceIdString]);
      systematicMutationDetectedFlag = true;
    }
  }
  return systematicMutationDetectedFlag;
}

var REGISTRY_ROW_COUNT_TOKEN_KEY = 'STAGING_DATA_MATRIX_ROW_COUNT_INDEX';

function onEdit(e) {
  if (!e || !e.range) return;

  var sheet = e.range.getSheet();
  var dynamicSheetNameIdentifier = sheet.getName();

  if (dynamicSheetNameIdentifier !== DATA_STORE_IDENTIFIERS.STAGING_INPUT) return;

  var executionContextStartRow = e.range.getRow();
  var executionContextEndRow   = e.range.getLastRow();
  var executionContextStartCol = e.range.getColumn();
  var executionContextEndCol   = e.range.getLastColumn();

  if (executionContextEndRow < DATALAYER_START_ROW) return;
  if (executionContextStartRow < DATALAYER_START_ROW) executionContextStartRow = DATALAYER_START_ROW;

  var associatedTargetRowsCollection = [];
  for (var r = executionContextStartRow; r <= executionContextEndRow; r++) {
    associatedTargetRowsCollection.push(r);
  }

  var scriptPropertiesRef = PropertiesService.getScriptProperties();
  var legacyHistoricalCachedRowCount = Number(scriptPropertiesRef.getProperty(REGISTRY_ROW_COUNT_TOKEN_KEY)) || 0;
  var realTimeConcurrentRowCountIndex = sheet.getLastRow();

  if (legacyHistoricalCachedRowCount > 0 && realTimeConcurrentRowCountIndex < legacyHistoricalCachedRowCount) {
    executeStructuralArrayDegradationInterceptions_(sheet);
  }
  scriptPropertiesRef.setProperty(REGISTRY_ROW_COUNT_TOKEN_KEY, String(realTimeConcurrentRowCountIndex));

  var matrixSkuChangeStateFlag            = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.SKU, executionContextStartCol, executionContextEndCol);
  var matrixGroupCodeChangeStateFlag      = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.ORGANIZATION_CODE, executionContextStartCol, executionContextEndCol);
  var matrixQuantityUnitsChangeStateFlag  = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.QUANTITY_UNITS, executionContextStartCol, executionContextEndCol);
  var matrixVisualUrlChangeStateFlag      = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.VISUAL_URL, executionContextStartCol, executionContextEndCol);
  var matrixIdentityIndexChangeStateFlag  = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.UNIQUE_IDENTITY_INDEX, executionContextStartCol, executionContextEndCol);
  var matrixCurrencyLabelChangeStateFlag  = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.MONETARY_LABEL, executionContextStartCol, executionContextEndCol);
  var matrixSourceIdChangeStateFlag       = crossReferenceColumnIndexBoundaries_(COLUMN_SCHEMA_MAP.SOURCE_RECORD_ID, executionContextStartCol, executionContextEndCol);

  if (matrixSourceIdChangeStateFlag) {
    if (traceHistoricGroupKeyFallbackConfigurations_(sheet, associatedTargetRowsCollection)) {
      matrixGroupCodeChangeStateFlag = true; 
    }
  }

  if (matrixIdentityIndexChangeStateFlag) {
    overrideSequenceCascadingCalculations_(sheet, executionContextStartRow);
  }

  if (matrixCurrencyLabelChangeStateFlag) {
    sheet.getRange(executionContextStartRow, COLUMN_SCHEMA_MAP.STANDARD_RATIO, associatedTargetRowsCollection.length, 1).clearContent();
  }

  if (matrixVisualUrlChangeStateFlag) {
    batchRenderGraphicViewports_(sheet, executionContextStartRow, executionContextEndRow);
  }
  if (matrixSkuChangeStateFlag) {
    if (associatedTargetRowsCollection.length > 3) {
      batchProcessGlobalProductInformationSync_(sheet, executionContextStartRow, executionContextEndRow);
    } else {
      syncIndividualTargetedRowsProductProfiles_(sheet, associatedTargetRowsCollection);
    }
  }

  if (matrixGroupCodeChangeStateFlag) {
    injectSequentialTrackingIndices_(sheet, associatedTargetRowsCollection);
    recompressInternalSystemIndicesg_(sheet, null);
  }

  for (var i = 0; i < associatedTargetRowsCollection.length; i++) {
    var rawHorizontalLineItemValues = sheet.getRange(associatedTargetRowsCollection[i], 1, 1, 30).getValues()[0];
    var structuralActivityAssertedFlag = false;
    for (var c = 0; c < 30; c++) {
      if (String(rawHorizontalLineItemValues[c]).trim() !== '') {
        structuralActivityAssertedFlag = true;
        break;
      }
    }
    if (structuralActivityAssertedFlag) {
      var contextualStateIndicatorFlag = rawHorizontalLineItemValues[COLUMN_SCHEMA_MAP.OPERATION_FLAG - 1];
      if (!contextualStateIndicatorFlag || String(contextualStateIndicatorFlag).trim() === '') {
        sheet.getRange(associatedTargetRowsCollection[i], COLUMN_SCHEMA_MAP.OPERATION_FLAG).setValue('Queue Allocation Pending');
      }
    }
  }

  enforceSchemaValidationsToRange_(sheet, executionContextStartRow, executionContextEndRow);

  if (associatedTargetRowsCollection.length > 3) {
    dynamicMatrixFinancialCalculationsExecutionPipeline_(sheet, executionContextStartRow, executionContextEndRow);
  } else {
    processDynamicRowFinancialCalculations_(sheet, associatedTargetRowsCollection);
  }

  evaluateStagingRowsComplianceLogs_(sheet, executionContextStartRow, executionContextEndRow);
}

function crossReferenceColumnIndexBoundaries_(columnDefinitionKeyIndex, verificationStartBoundIdx, verificationEndBoundIdx) {
  return columnDefinitionKeyIndex >= verificationStartBoundIdx && columnDefinitionKeyIndex <= verificationEndBoundIdx;
}


// ─────────────────────────────────────────────────────────────────────────────
//  10. ARRAY ELEMENT STRUCTURAL DEGRADATION INTERCEPTOR
// ─────────────────────────────────────────────────────────────────────────────

function evaluateStagingRowsComplianceLogs_(sheet, scanningStartRowIndex, scanningEndRowIndex) {
  var matrixLengthScopeCount = scanningEndRowIndex - scanningStartRowIndex + 1;
  if (matrixLengthScopeCount <= 0) return;

  var dynamicSystemValidationCacheArray = {};
  for (var uniqueValidationKey in RETRIEVAL_VALIDATION_VECTOR_MAP) {
    var rawConfigStringCollection = getConfigurationArray_(RETRIEVAL_VALIDATION_VECTOR_MAP[uniqueValidationKey]);
    var normalizedValidationOptionHashSet = {};
    for (var v = 0; v < rawConfigStringCollection.length; v++) {
      normalizedValidationOptionHashSet[String(rawConfigStringCollection[v]).trim().toLowerCase()] = true;
    }
    dynamicSystemValidationCacheArray[uniqueValidationKey] = normalizedValidationOptionHashSet;
  }

  var dimensionalExtractedDataCacheBlock = sheet.getRange(scanningStartRowIndex, 1, matrixLengthScopeCount, COLUMN_LIMIT_BOUNDARY).getValues();
  var calculatedSystemHealthLogBufferOutput = [];

  for (var i = 0; i < matrixLengthScopeCount; i++) {
    var activeEvaluationLineRowValues = dimensionalExtractedDataCacheBlock[i];
    var contextualAbsoluteRowCoordinateIndex = scanningStartRowIndex + i;

    var traceLineActivityDetectedFlag = false;
    for (var c = 0; c < 30; c++) {
      if (String(activeEvaluationLineRowValues[c]).trim() !== '') {
        traceLineActivityDetectedFlag = true;
        break;
      }
    }

    if (!traceLineActivityDetectedFlag) {
      calculatedSystemHealthLogBufferOutput.push(['']);
      for (var m = 0; m < SYSTEM_MANDATORY_CONSTRAINTS.length; m++) {
        var targetedEmptyColumnPointer = COLUMN_SCHEMA_MAP[SYSTEM_MANDATORY_CONSTRAINTS[m].key];
        sheet.getRange(contextualAbsoluteRowCoordinateIndex, targetedEmptyColumnPointer).setBackground(INTEGRITY_PASS_COLOR);
      }
      continue;
    }

    var compiledStructuralOmissionsList = [];
    for (var j = 0; j < SYSTEM_MANDATORY_CONSTRAINTS.length; j++) {
      var targetedConstraintFieldRecord = SYSTEM_MANDATORY_CONSTRAINTS[j];
      var structuralDesignColumnIndex = COLUMN_SCHEMA_MAP[targetedConstraintFieldRecord.key];
      var cellExtractedStringLiteral = String(activeEvaluationLineRowValues[structuralDesignColumnIndex - 1]).trim();
      var targetedWorkspaceCellReference = sheet.getRange(contextualAbsoluteRowCoordinateIndex, structuralDesignColumnIndex);

      if (cellExtractedStringLiteral === '' || cellExtractedStringLiteral === '0' || cellExtractedStringLiteral === 'undefined' || cellExtractedStringLiteral === 'null') {
        targetedWorkspaceCellReference.setBackground(EXCEPTION_HEX_COLOR);
        compiledStructuralOmissionsList.push(targetedConstraintFieldRecord.label);
      } else {
        var runtimeDropdownBoundaryConstraintsArray = dynamicSystemValidationCacheArray[targetedConstraintFieldRecord.key];
        if (runtimeDropdownBoundaryConstraintsArray && !runtimeDropdownBoundaryConstraintsArray[cellExtractedStringLiteral.toLowerCase()]) {
          targetedWorkspaceCellReference.setBackground(EXCEPTION_HEX_COLOR);
          compiledStructuralOmissionsList.push('Structural Violation: ' + targetedConstraintFieldRecord.label + ' (Dropdown Boundary Overstep)');
        } else {
          targetedWorkspaceCellReference.setBackground(INTEGRITY_PASS_COLOR);
        }
      }
    }

    var legacyUnresolvedRowErrorsString = String(sheet.getRange(contextualAbsoluteRowCoordinateIndex, COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG).getValue()).trim();
    var customPersistentErrorsCollection = legacyUnresolvedRowErrorsString.split('|').map(function(s) { return s.trim(); }).filter(function(s) {
      return s.length > 0 && s.indexOf('⚠ Omission Trace:') === -1 && s !== '✅ Validation Integrity Maintained' && s !== 'Identified Duplicate Record Conflict';
    });

    var compositeCompiledLogMessageString = '';
    if (compiledStructuralOmissionsList.length > 0) {
      compositeCompiledLogMessageString = '⚠ Omission Trace: ' + compiledStructuralOmissionsList.join(', ');
      if (customPersistentErrorsCollection.length > 0) {
        compositeCompiledLogMessageString += ' | ' + customPersistentErrorsCollection.join(' | ');
      }
      calculatedSystemHealthLogBufferOutput.push([compositeCompiledLogMessageString]);
    } else {
      if (customPersistentErrorsCollection.length > 0) {
        calculatedSystemHealthLogBufferOutput.push([customPersistentErrorsCollection.join(' | ')]);
      } else {
        calculatedSystemHealthLogBufferOutput.push(['✅ Validation Integrity Maintained']);
      }
    }
  }

  sheet.getRange(scanningStartRowIndex, COLUMN_SCHEMA_MAP.EVALUATION_HEALTH_LOG, matrixLengthScopeCount, 1).setValues(calculatedSystemHealthLogBufferOutput);
}

function validateAllRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;
  var trackingLastRowIndex = sheet.getLastRow();
  if (trackingLastRowIndex < DATALAYER_START_ROW) {
    generateSystemFeedbackNotification_('Empty Tracking Area', 'No active transactional array rows available for execution sweeps.', 'info');
    return;
  }
  evaluateStagingRowsComplianceLogs_(sheet, DATALAYER_START_ROW, trackingLastRowIndex);
  generateSystemFeedbackNotification_('Compliance Sweeps Executed',
    'Staging grid validation states updated natively across ' + (trackingLastRowIndex - 1) + ' data tracking arrays.<br><br>'
    + '🔴 Visual Alert Fills = Structural Rule Failures<br>'
    + '✅ Health Status Metrics = Clear Pass States',
    'info');
}


// ─────────────────────────────────────────────────────────────────────────────
//  11. ARRAY ELEMENT STRUCTURAL DEGRADATION INTERCEPTOR
// ─────────────────────────────────────────────────────────────────────────────

function executeStructuralArrayDegradationInterceptions_(sheet) {
  recompressInternalSystemIndicesg_(sheet, null);
}

function onChange(e) {
  if (!e) return;
  if (e.changeType === 'REMOVE_ROW' || e.changeType === 'INSERT_ROW') {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
    if (!sheet) return;

    if (e.changeType === 'REMOVE_ROW') {
      recompressInternalSystemIndicesg_(sheet, null);
    }

    var totalRowsCount = sheet.getLastRow();
    if (totalRowsCount >= DATALAYER_START_ROW) {
      enforceSchemaValidationsToRange_(sheet, DATALAYER_START_ROW, totalRowsCount);
    }

    PropertiesService.getScriptProperties().setProperty(REGISTRY_ROW_COUNT_TOKEN_KEY, String(totalRowsCount));
  }
}


// ─────────────────────────────────────────────────────────────────────────────
//  12. GRAPHICAL USER INTERFACE MODAL COMPONENT ENGINES
// ─────────────────────────────────────────────────────────────────────────────

function generateSystemFeedbackNotification_(title, message, type) {
  var thematicColorPalettes = {
    success: { bg: '#e8f5e9', accent: '#2e7d32', icon: '✅', gradient: 'linear-gradient(135deg, #43a047, #66bb6a)' },
    error:   { bg: '#ffebee', accent: '#c62828', icon: '❌', gradient: 'linear-gradient(135deg, #e53935, #ef5350)' },
    warning: { bg: '#fff8e1', accent: '#f57f17', icon: '⚠️', gradient: 'linear-gradient(135deg, #ff8f00, #ffb300)' },
    info:    { bg: '#e3f2fd', accent: '#1565c0', icon: 'ℹ️', gradient: 'linear-gradient(135deg, #1e88e5, #42a5f5)' }
  };

  var configThematicMatch = thematicColorPalettes[type] || thematicColorPalettes.info;
  var safeEscapedMessageString = message.replace(/\n/g, '<br>').replace(/"/g, '&quot;');

  var responsiveDialogHtmlContent = '<!DOCTYPE html><html><head>'
    + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'
    + '<style>'
    + '* { margin: 0; padding: 0; box-sizing: border-box; }'
    + 'body { font-family: "Inter", sans-serif; background: transparent; display: flex; justify-content: center; padding: 4px; }'
    + '.card { width: 100%; max-width: 420px; background: #fff; border-radius: 16px;'
    + '  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);'
    + '  overflow: hidden; animation: slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1); }'
    + '.header { background: ' + configThematicMatch.gradient + '; padding: 20px 24px; color: #fff; }'
    + '.header .icon { font-size: 28px; margin-bottom: 6px; }'
    + '.header h2 { font-size: 18px; font-weight: 700; letter-spacing: -0.3px; }'
    + '.body { padding: 20px 24px; color: #37474f; font-size: 14px; line-height: 1.6;'
    + '  background: ' + configThematicMatch.bg + '; border-top: 3px solid ' + configThematicMatch.accent + '; }'
    + '.btn-row { padding: 16px 24px; text-align: right; background: #fafafa; }'
    + '.btn { background: ' + configThematicMatch.gradient + '; color: #fff; border: none; padding: 10px 28px;'
    + '  border-radius: 8px; font-family: "Inter", sans-serif; font-size: 14px;'
    + '  font-weight: 600; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;'
    + '  box-shadow: 0 4px 12px rgba(0,0,0,0.15); }'
    + '.btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }'
    + '@keyframes slideUp { from { opacity: 0; transform: translateY(20px); }'
    + '  to { opacity: 1; transform: translateY(0); } }'
    + '</style></head><body>'
    + '<div class="card">'
    + '  <div class="header"><div class="icon">' + configThematicMatch.icon + '</div><h2>' + title + '</h2></div>'
    + '  <div class="body">' + safeEscapedMessageString + '</div>'
    + '  <div class="btn-row"><button class="btn" onclick="google.script.host.close()">Acknowledge</button></div>'
    + '</div></body></html>';

  var terminalHtmlOutputModalObject = HtmlService.createHtmlOutput(responsiveDialogHtmlContent)
    .setWidth(460)
    .setHeight(300);

  SpreadsheetApp.getUi().showModalDialog(terminalHtmlOutputModalObject, ' ');
}

function displayCustomConfirmationInterface_(title, message) {
  var ui = SpreadsheetApp.getUi();
  var alertInteractionResponse = ui.alert(title, message, ui.ButtonSet.YES_NO);
  return alertInteractionResponse === ui.Button.YES;
}


// ─────────────────────────────────────────────────────────────────────────────
//  12. CORE MENU INITIALIZATION SEQUENCES
// ─────────────────────────────────────────────────────────────────────────────

function syncLastMaxFromAllOrders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.SYSTEM_CONFIG);
  var masterSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.MASTER_DATABASE);
  var stagingSheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);

  if (!configSheet || !masterSheet || !stagingSheet) {
    generateSystemFeedbackNotification_('Data Nodes Disconnected', 'Required transactional matrices missing from runtime environment context.', 'error');
    return;
  }

  var highWaterConfigRowIndex = configSheet.getLastRow();
  if (highWaterConfigRowIndex < 2) return;
  var matrixConfigurationArray = configSheet.getRange(2, 1, highWaterConfigRowIndex - 1, configSheet.getLastColumn()).getValues();

  var trackingPrefixIndicesAllocationCache = {};
  for (var i = 0; i < matrixConfigurationArray.length; i++) {
    var identityPrefixKeyToken = String(matrixConfigurationArray[i][CONFIGURATION_SCHEMA_MAP.Config_Prefix_Code - 1]).trim().toUpperCase();
    if (identityPrefixKeyToken) trackingPrefixIndicesAllocationCache[identityPrefixKeyToken] = 0;
  }

  function executeWorksheetSequenceExtractionScan(targetActiveSheetObject) {
    if (!targetActiveSheetObject) return;
    var finalRowIndex = targetActiveSheetObject.getLastRow();
    if (finalRowIndex < DATALAYER_START_ROW) return; 
    var elementsHeadersRowArray = targetActiveSheetObject.getRange(METADATA_HEADER_ROW, 1, 1, targetActiveSheetObject.getLastColumn()).getValues()[0];
    var extractedIdentityColumnOffset = 0;
    
    for (var i = 0; i < elementsHeadersRowArray.length; i++) {
      var structuralHeaderStringLabel = String(elementsHeadersRowArray[i]).trim().toUpperCase();
      if (structuralHeaderStringLabel === 'UNIQUE_IDENTITY_INDEX' || structuralHeaderStringLabel === 'UNIQUE IDENTITY INDEX') {
        extractedIdentityColumnOffset = i;
        break;
      }
    }
    
    if (extractedIdentityColumnOffset < 0) return;

    var targetTrackingValuesMatrixBlock = targetActiveSheetObject.getRange(DATALAYER_START_ROW, extractedIdentityColumnOffset + 1, finalRowIndex - DATALAYER_START_ROW + 1, 1).getValues();
    for (var r = 0; r < targetTrackingValuesMatrixBlock.length; r++) {
      var targetEvaluationString = String(targetTrackingValuesMatrixBlock[r][0]).trim();
      var criteriaRegexValidationPattern = targetEvaluationString.match(/^([A-Za-z]*)(\d+)(?:-[A-Za-z0-9]+)?$/);
      if (criteriaRegexValidationPattern) {
        var sequenceClassPrefixToken = criteriaRegexValidationPattern[1].toUpperCase();
        var extractionNumericalIndexSequenceValue = parseInt(criteriaRegexValidationPattern[2], 10);
        if (trackingPrefixIndicesAllocationCache.hasOwnProperty(sequenceClassPrefixToken) && extractionNumericalIndexSequenceValue > trackingPrefixIndicesAllocationCache[sequenceClassPrefixToken]) {
          trackingPrefixIndicesAllocationCache[sequenceClassPrefixToken] = extractionNumericalIndexSequenceValue;
        }
      }
    }
  }

  executeWorksheetSequenceExtractionScan(masterSheet);
  executeWorksheetSequenceExtractionScan(stagingSheet);

  var structuralConfigurationUpdatesBlockOutput = [];
  for (var j = 0; j < matrixConfigurationArray.length; j++) {
    var extractionPrefixIterationKey = String(matrixConfigurationArray[j][CONFIGURATION_SCHEMA_MAP.Config_Prefix_Code - 1]).trim().toUpperCase();
    if (extractionPrefixIterationKey && trackingPrefixIndicesAllocationCache.hasOwnProperty(extractionPrefixIterationKey)) {
      structuralConfigurationUpdatesBlockOutput.push([trackingPrefixIndicesAllocationCache[extractionPrefixIterationKey]]);
    } else {
      structuralConfigurationUpdatesBlockOutput.push(['']);
    }
  }

  configSheet.getRange(2, CONFIGURATION_SCHEMA_MAP.Config_Sequence_Max, structuralConfigurationUpdatesBlockOutput.length, 1).setValues(structuralConfigurationUpdatesBlockOutput);
  generateSystemFeedbackNotification_('Calibration Completed Successfully', 'Dynamic tracking indexes normalized accurately against live database boundaries.', 'success');
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📦 Pipeline Staging Operator')
    .addItem('🔄 Standardize Field Schema Boundaries', 'applyAllValidations')
    .addItem('🔢 Re-align Alpha-Numeric Sequences',  'regenerateAllInternalOrderNos')
    .addItem('📊 Execute Financial Yield Calculations', 'recalcAllFinancials')
    .addItem('🔍 Refresh Base Pricing Profiles',       'refreshAllProductCosts')
    .addItem('🚨 Run Grid Compliance Diagnostics',    'validateAllRows')
    .addSeparator()
    .addItem('📋 Stage Selected Data Elements',         'appendSelectedToAllOrders')
    .addItem('🚀 Deploy Master Database Commit',       'appendAllToAllOrders')
    .addSeparator()
    .addItem('🔢 Recalibrate Sequence Thresholds',     'syncLastMaxFromAllOrders')
    .addSeparator()
    .addItem('⚙️ Boot Core Script Environments',        'initializeSystem')
    .addToUi();

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (sheet) {
    PropertiesService.getScriptProperties().setProperty(REGISTRY_ROW_COUNT_TOKEN_KEY, String(sheet.getLastRow()));
  }
}

function initializeSystem() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) {
    generateSystemFeedbackNotification_('Boot Exception', 'Staging framework initialization vectors unavailable.', 'error');
    return;
  }

  var finalDataIndexLimitPointer = sheet.getLastRow();
  if (finalDataIndexLimitPointer >= DATALAYER_START_ROW) {
    enforceSchemaValidationsToRange_(sheet, DATALAYER_START_ROW, finalDataIndexLimitPointer);
  }

  PropertiesService.getScriptProperties().setProperty(REGISTRY_ROW_COUNT_TOKEN_KEY, String(finalDataIndexLimitPointer));

  generateSystemFeedbackNotification_('Orchestration Environment Online',
    'Staging parameters compiled successfully!<br><br>'
    + '• Data constraints applied over: ' + Math.max(0, finalDataIndexLimitPointer - 1) + ' data tracking arrays.<br>'
    + '• Volatile structure monitoring hooks active.<br>'
    + '• Reactive triggers globally initialized.',
    'success');
}

function recalcAllFinancials() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;
  var finalDataIndexLimitPointer = sheet.getLastRow();
  if (finalDataIndexLimitPointer < DATALAYER_START_ROW) return;

  dynamicMatrixFinancialCalculationsExecutionPipeline_(sheet, DATALAYER_START_ROW, finalDataIndexLimitPointer);
  generateSystemFeedbackNotification_('Yield Profiles Refreshed',
    'Financial evaluation frameworks compiled natively for ' + (finalDataIndexLimitPointer - 1) + ' data rows.',
    'success');
}

function refreshAllProductCosts() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_STORE_IDENTIFIERS.STAGING_INPUT);
  if (!sheet) return;
  var finalDataIndexLimitPointer = sheet.getLastRow();
  if (finalDataIndexLimitPointer < DATALAYER_START_ROW) return;

  batchProcessGlobalProductInformationSync_(sheet, DATALAYER_START_ROW, finalDataIndexLimitPointer);
  generateSystemFeedbackNotification_('Profiles Equalized',
    'Pricing models updated against backend asset matrices across ' + (finalDataIndexLimitPointer - 1) + ' rows.',
    'info');
}
