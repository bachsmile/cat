<template>
  <div
    class="h-screen bg-[#050508] text-white font-['Inter',_sans-serif] p-4 lg:p-6 overflow-hidden"
    :class="{ 'dragging-mode': isDragging }"
  >
    <div
      class="max-w-[1700px] mx-auto h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <!-- Slim All-in-one Header -->
      <LawEditorToolbar
        v-model:selectedFont="selectedFont"
        v-model:selectedAlignment="selectedAlignment"
        v-model:selectedTextColor="selectedTextColor"
        v-model:selectedBgColor="selectedBgColor"
        v-model:showSidebar="showSidebar"
        :isSaving="isSaving"
        :isEditing="isEditing"
        @openBuilder="showStructureModal = true"
        @openAlignModal="showAlignModal = true"
        @insertTable="insertTable"
        @save="handleSave"
        @back="router.back()"
      />

      <div class="relative flex-1 min-h-0 overflow-hidden">
        <!-- Sidebar Config (Toggleable) -->
        <div
          v-if="showSidebar"
          class="absolute left-0 top-0 bottom-0 w-80 z-[100] transition-all"
        >
          <LawEditorSidebar
            :form="form"
            @addField="addField"
            @removeField="(idx) => form.config.fields.splice(idx, 1)"
            @insertPlaceholder="insertPlaceholderAtActivePage"
          />
        </div>

        <!-- Editor Main Area -->
        <div
          class="h-full flex flex-col transition-all duration-300"
          :class="{ 'ml-80': showSidebar }"
        >
          <!-- Fixed Editor Ruler -->
          <div
            class="flex-shrink-0 flex flex-col items-center z-50 bg-[#050508] py-2 border-b border-white/5"
          >
            <!-- Interactive Horizontal Ruler -->
            <div
              class="w-[21cm] h-9 bg-[#1a1a24] border border-white/10 flex items-end overflow-visible shadow-2xl rounded-lg group/ruler relative"
            >
              <!-- Left Margin Area + Draggable Handle -->
              <div
                class="h-full bg-white/10 relative transition-all"
                :style="{ width: `${pageSetup.marginLeft}px` }"
              >
                <div
                  class="absolute -right-2 top-0 h-full w-4 cursor-col-resize flex items-center justify-center group/h z-20"
                  @mousedown="startDrag('left')"
                >
                  <div
                    class="w-[2px] h-full bg-teal-400 opacity-50 group-hover/h:opacity-100 transition-opacity"
                  ></div>
                  <div
                    class="absolute -bottom-6 w-4 h-4 bg-teal-500 rounded-sm border-2 border-white shadow-xl pointer-events-none opacity-0 group-hover/h:opacity-100 translate-y-2 group/ruler:opacity-100"
                  ></div>
                </div>
              </div>

              <!-- Interactive Ticks -->
              <div
                class="flex-1 h-full bg-white/[0.05] relative overflow-hidden"
              >
                <div
                  v-for="i in 30"
                  :key="i"
                  class="absolute h-3 w-px bg-white/20"
                  :style="{ left: `${(i - 1) * 1}cm` }"
                >
                  <span
                    v-if="(i - 1) % 2 === 0"
                    class="absolute -top-6 -left-1.5 text-[8px] text-gray-300 font-black uppercase"
                    >{{ i - 1 }}</span
                  >
                </div>
                <div
                  v-for="i in 60"
                  :key="'h-' + i"
                  class="absolute h-1.5 w-px bg-white/10"
                  :style="{ left: `${(i - 1) * 0.5}cm` }"
                ></div>
              </div>

              <!-- Right Margin Area + Draggable Handle -->
              <div
                class="h-full bg-white/10 relative transition-all"
                :style="{ width: `${pageSetup.marginRight}px` }"
              >
                <div
                  class="absolute -left-2 top-0 h-full w-4 cursor-col-resize flex items-center justify-center group/h z-20"
                  @mousedown="startDrag('right')"
                >
                  <div
                    class="w-[2px] h-full bg-teal-400 opacity-50 group-hover/h:opacity-100 transition-opacity"
                  ></div>
                  <div
                    class="absolute -bottom-6 w-4 h-4 bg-teal-500 rounded-sm border-2 border-white shadow-xl pointer-events-none opacity-0 group-hover/h:opacity-100 translate-y-2 group/ruler:opacity-100"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Scrollable Sheets Area -->
          <div class="flex-1 overflow-y-auto scrollbar-hide py-4">
            <div class="flex flex-col items-center">
              <!-- Sheets Container (Tờ giấy trải dài không ngắt) -->
              <div class="flex flex-col gap-10 pb-40 relative">
                <div
                  v-for="(page, pIdx) in pagedData"
                  :key="page.id"
                  class="w-[21cm] min-h-[29.7cm] h-auto pb-20 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.8)] rounded-[1px] relative flex flex-col group/sheet transition-all duration-500"
                >
                  <!-- Per-Page Vertical Ruler -->
                  <div
                    class="absolute -left-12 top-0 h-full w-9 bg-[#1a1a24] border border-white/10 rounded-xl overflow-visible group/vruler pointer-events-auto z-10"
                  >
                    <!-- Top Margin Handle -->
                    <div
                      class="absolute left-0 w-full bg-white/10 border-b border-white/10 flex items-end justify-center transition-all z-20"
                      :style="{ height: `${pageSetup.marginTop}px` }"
                    >
                      <div
                        class="absolute -bottom-2 left-0 w-full h-4 cursor-row-resize flex items-center justify-center group/v"
                        @mousedown="startDrag('top')"
                      >
                        <div
                          class="h-[2px] w-full bg-teal-400 opacity-50 group-hover/v:opacity-100 transition-opacity"
                        ></div>
                        <div
                          class="absolute -right-6 w-4 h-4 bg-teal-500 rounded-sm border-2 border-white shadow-xl pointer-events-none opacity-0 group-hover/v:opacity-100 translate-x-2 group/vruler:opacity-100"
                        ></div>
                      </div>
                    </div>

                    <!-- Centimeter Ticks -->
                    <div
                      class="flex-1 h-full bg-white/[0.05] relative overflow-hidden cursor-default"
                    >
                      <div
                        v-for="i in 30"
                        :key="'v-' + i"
                        class="absolute w-3 h-px bg-white/20"
                        :style="{ top: `${(i - 1) * 1}cm` }"
                      >
                        <span
                          v-if="(i - 1) % 5 === 0"
                          class="absolute -right-8 -top-2 text-[8px] text-gray-300 font-black"
                          >{{ i - 1 }}</span
                        >
                      </div>
                    </div>

                    <!-- Bottom Margin Handle -->
                    <div
                      class="absolute bottom-0 left-0 w-full bg-white/10 border-t border-white/10 flex items-start justify-center transition-all z-20"
                      :style="{ height: `${pageSetup.marginBottom}px` }"
                    >
                      <div
                        class="absolute -top-2 left-0 w-full h-4 cursor-row-resize flex items-center justify-center group/v"
                        @mousedown="startDrag('bottom')"
                      >
                        <div
                          class="h-[2px] w-full bg-teal-400 opacity-50 group-hover/v:opacity-100 transition-opacity"
                        ></div>
                        <div
                          class="absolute -right-6 w-4 h-4 bg-teal-500 rounded-sm border-2 border-white shadow-xl pointer-events-none opacity-0 group-hover/v:opacity-100 translate-x-2 group/vruler:opacity-100"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <!-- Guide Lines -->
                  <div
                    v-if="isDragging"
                    class="absolute inset-0 pointer-events-none z-[70] overflow-hidden"
                  >
                    <div
                      v-if="isDragging === 'left' || isDragging === 'right'"
                      class="absolute top-0 bottom-0 border-l border-dashed border-teal-500/60 transition-none"
                      :style="{
                        left:
                          isDragging === 'left'
                            ? `${pageSetup.marginLeft}px`
                            : `calc(21cm - ${pageSetup.marginRight}px)`,
                      }"
                    ></div>
                    <div
                      v-if="isDragging === 'top' || isDragging === 'bottom'"
                      class="absolute left-0 right-0 border-t border-dashed border-teal-500/60 transition-none"
                      :style="{
                        top:
                          isDragging === 'top'
                            ? `${pageSetup.marginTop}px`
                            : `calc(1120px - ${pageSetup.marginBottom}px)`,
                      }"
                    ></div>
                  </div>

                  <!-- Header -->
                  <div
                    class="w-full bg-gray-50/50 border-b border-gray-100 flex items-center justify-center pointer-events-auto select-none transition-all cursor-pointer group/h-area"
                    :style="{ height: `${pageSetup.marginTop}px` }"
                    @dblclick="editingHeaderIdx = pIdx"
                  >
                    <input
                      v-if="editingHeaderIdx === pIdx"
                      v-model="page.headerText"
                      class="bg-transparent border-none text-center text-[7px] text-teal-600 outline-none w-full uppercase tracking-[0.4em] font-bold"
                      @blur="editingHeaderIdx = null"
                      @keyup.enter="editingHeaderIdx = null"
                      v-focus
                      placeholder="Enter Header..."
                    />
                    <span
                      v-else
                      class="text-[7px] text-gray-400 uppercase tracking-[0.4em] group-hover/h-area:text-teal-400/60 transition-colors"
                    >
                      {{ page.headerText || `Header Page ${pIdx + 1}` }}
                    </span>
                  </div>

                  <!-- Content -->
                  <div
                    class="relative flex-1 overflow-hidden"
                    :style="{
                      paddingLeft: `${pageSetup.marginLeft}px`,
                      paddingRight: `${pageSetup.marginRight}px`,
                    }"
                  >
                    <div
                      contenteditable="true"
                      :id="'editor-p-' + pIdx"
                      :style="{
                        fontFamily: selectedFont,
                        textAlign: selectedAlignment as any,
                        fontSize: `${builderData.format.size}px`,
                        color: selectedTextColor,
                        backgroundColor:
                          selectedBgColor === 'transparent'
                            ? 'transparent'
                            : selectedBgColor,
                        minHeight: '100%',
                        outline: 'none',
                        whiteSpace: 'pre-wrap',
                        overflowY: 'auto',
                      }"
                      class="w-full h-full border-none focus:ring-0 text-gray-900 leading-[28px] resize-none placeholder:text-gray-200 scrollbar-hide py-1 transition-all"
                      @input="onContentInput(pIdx, $event)"
                      @keydown="handleKeyDown($event)"
                      @mousedown="handleEditorMouseDown"
                      @mousemove="handleEditorMouseMove"
                      v-safe-html="page.content"
                      @focus="activePageIndex = pIdx"
                    ></div>
                  </div>

                  <!-- Footer -->
                  <div
                    class="w-full bg-gray-50/50 border-t border-gray-100 flex flex-col items-center justify-center pointer-events-none select-none transition-all"
                    :style="{ height: `${pageSetup.marginBottom}px` }"
                  >
                    <span
                      class="text-[7px] text-gray-400 uppercase tracking-[0.4em] mb-1"
                      >Footer Page {{ pIdx + 1 }}</span
                    >
                    <span
                      class="text-[10px] text-gray-400 font-black tracking-tighter"
                      >P.{{ pIdx + 1 }}</span
                    >
                  </div>

                  <div
                    class="absolute -bottom-10 left-0 w-full h-10 bg-[#050508] pointer-events-none flex items-center justify-center"
                  >
                    <div class="w-20 h-px bg-white/5"></div>
                  </div>
                </div>

                <div
                  class="mt-6 mb-10 text-[10px] text-gray-700 font-bold uppercase tracking-[0.4em] flex gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5"
                >
                  <span class="flex items-center gap-2"
                    ><div
                      class="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"
                    ></div>
                    Pages: {{ pagedData.length }}</span
                  >
                  <span>Words: {{ wordCount }}</span>
                  <span class="text-gray-800"
                    >Layout: {{ pageSetup.marginLeft }}_{{
                      pageSetup.marginRight
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LawStructureBuilderModal
      :show="showStructureModal"
      :builderData="builderData"
      :pageSetup="pageSetup"
      :selectedFont="selectedFont"
      @close="showStructureModal = false"
      @generate="generateFromBuilder"
    />

    <LawAlignModal
      :show="showAlignModal"
      :pageSetup="pageSetup"
      @close="showAlignModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// Remove unused icons if any
import { lawApi } from "../../api/law";
import LawAlignModal from "./components/LawAlignModal.vue";
import LawEditorSidebar from "./components/LawEditorSidebar.vue";
import LawEditorToolbar from "./components/LawEditorToolbar.vue";
import LawStructureBuilderModal from "./components/LawStructureBuilderModal.vue";

const route = useRoute();
const router = useRouter();
const isEditing = computed(() => !!route.params.id);
const isSaving = ref(false);
const showAlignModal = ref(false);
const showStructureModal = ref(false);
const activePageIndex = ref(0);
const showSidebar = ref(false);
const selectedFont = ref("'Times New Roman', Times, serif");
const selectedAlignment = ref("left");
const selectedTextColor = ref("#111827");
const selectedBgColor = ref("transparent");
const editingHeaderIdx = ref<number | null>(null);

const builderData = ref({
  format: {
    size: 14,
    font: "Times New Roman",
    align: [12, 12, 12, 12],
    textAlign: 0,
  },
  content: [
    {
      fullWidth: true,
      items: [
        {
          title: "Tiêu đề 1",
          bold: false,
          italic: false,
          underline: false,
          size: 14,
          textAlign: 0,
          color: "#111827",
          type: 0,
          flex: 1,
          prefix: ": ",
          suffix: "",
          row: 1,
        },
      ],
    },
  ] as any[],
});

const addField = () => {
  form.value.config.fields.push({ label: "", name: "", type: "text" });
};

const measureCanvas = document.createElement("canvas");
const measureContext = measureCanvas.getContext("2d");

const getTextSegmentWidth = (text: string, font: string) => {
  if (!measureContext) return text.length * 8;
  measureContext.font = font;
  return measureContext.measureText(text).width;
};

const generateFromBuilder = async () => {
  let overallNoteIndex = 0;
  // const A4_HEIGHT_PX = 1123;
  const A4_WIDTH_PX = 794;
  const SAFE_BUFFER = 20;
  const availableWidth =
    A4_WIDTH_PX -
    (pageSetup.value.marginLeft + pageSetup.value.marginRight) -
    SAFE_BUFFER;
  const currentFont = `${builderData.value.format.size}px ${selectedFont.value}`;
  const dotPx = getTextSegmentWidth(".", currentFont);

  // Hidden temp div for measurement
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${availableWidth}px`;
  tempDiv.style.fontFamily = selectedFont.value;
  tempDiv.style.fontSize = `${builderData.value.format.size}px`;
  document.body.appendChild(tempDiv);

  let currentPageIdx = activePageIndex.value;
  if (!pagedData.value[currentPageIdx]) {
    currentPageIdx = 0;
    pagedData.value = [{ id: Date.now(), content: "", headerText: "" }];
  }

  // Get existing height of active page
  const ghost = document.createElement("div");
  ghost.style.width = `${availableWidth}px`;
  ghost.innerHTML = pagedData.value[currentPageIdx]?.content || "";
  tempDiv.innerHTML = "";
  tempDiv.appendChild(ghost);
  let listCounter = 0;

  for (const rowObj of builderData.value.content) {
    let finalRowContent = "";
    const items = rowObj.items || [];
    const isFullWidth = rowObj.fullWidth !== false;

    const totalContentPx = items.reduce((sum: number, item: any) => {
      let baseLabel = item.title || "";
      if (item.type === 1) baseLabel += item.prefix || "";
      const isNote = item.note && item.note.trim() !== "";
      const noteTxt = isNote ? `(99)` : "";
      return (
        sum +
        getTextSegmentWidth(baseLabel + noteTxt, currentFont) +
        (item.type === 1 ? 50 : 0)
      );
    }, 0);

    const rowAvailableWidth = isFullWidth
      ? availableWidth
      : Math.min(availableWidth, totalContentPx + 20);
    const rowAlignment = ["left", "center", "right", "justify"][
      rowObj.textAlign ?? 0
    ];

    if (rowObj.isTable) {
      // Real Table Rendering Logic
      let tableCells = "";

      items.forEach((item: any) => {
        const hasNote = item.note && item.note.trim() !== "";
        let noteIndex = 0;
        if (hasNote) {
          overallNoteIndex++;
          noteIndex = overallNoteIndex;
        }

        const noteText = noteIndex ? `(${noteIndex})` : "";
        let baseLabel =
          item.type === 1
            ? (item.title || "") + (item.prefix || "")
            : item.title || "";
        if (item.type === 2) {
          if (item.hasCheckboxBefore) baseLabel = "☐ " + baseLabel;
          if (item.hasCheckboxAfter) baseLabel = baseLabel + " ☐";
        }

        const endSuffix = item.type === 1 ? item.suffix || "" : "";
        let itemStr = baseLabel;

        if (item.listType === "bullet") {
          itemStr = '<span style="margin-right: 5px;">•</span>' + itemStr;
        } else if (item.listType === "number") {
          listCounter++;
          itemStr =
            `<span style="margin-right: 5px;">${listCounter}.</span>` + itemStr;
        }

        if (noteIndex) {
          itemStr += `<span style="color: #6366f1; font-weight: 800; font-size: 0.8em; margin-left: 1px;">(${noteIndex})</span>`;
        }

        if (item.type === 1) {
          // In table cells, we usually use less dots or just empty space if it's a form cell
          const labelPx = getTextSegmentWidth(
            baseLabel + noteText,
            currentFont,
          );
          const share =
            (Number(item.flex) || 1) /
            items.reduce(
              (sum: number, i: any) => sum + (Number(i.flex) || 1),
              0,
            );
          const targetSegmentPx = rowAvailableWidth * share;
          const dotsNeededPx = Math.max(0, targetSegmentPx - labelPx - 20);
          const dotsCount = Math.floor(dotsNeededPx / dotPx);
          itemStr += ".".repeat(dotsCount) + endSuffix;
        }

        const cellPadding =
          item.padding !== undefined ? `${item.padding}pt` : "6pt 8pt";
        const cellStyles = [
          `width: ${((Number(item.flex) || 1) / items.reduce((sum: number, i: any) => sum + (Number(i.flex) || 1), 0)) * 100}%`,
          `border: 0.5pt solid #000`,
          `padding: ${cellPadding}`,
          `vertical-align: top`,
          `text-align: ${["left", "center", "right", "justify"][item.textAlign || 0]}`,
          `font-size: ${item.size || builderData.value.format.size}px`,
          `color: ${item.color || "#000"}`,
          `background-color: ${item.background || "transparent"}`,
          item.bold ? "font-weight: bold" : "",
          item.italic ? "font-style: italic" : "",
          item.underline ? "text-decoration: underline" : "",
          `line-height: ${item.lineHeight || 1.5}`,
          `box-sizing: border-box`,
          `word-break: break-word`,
        ]
          .filter(Boolean)
          .join(";");

        tableCells += `<td style="${cellStyles}">${itemStr}</td>`;
      });
      const rowHeightStyle = rowObj.minHeight
        ? `height: ${rowObj.minHeight}px;`
        : "";
      const tableStyle = `width: ${rowAvailableWidth}px; border-collapse: collapse; table-layout: fixed; margin: 0 auto; box-sizing: border-box;`;
      finalRowContent = `<div style="width: 100%; display: flex; justify-content: ${rowAlignment};"><table style="${tableStyle}"><tr style="${rowHeightStyle}">${tableCells}</tr></table></div>`;
    } else {
      // Original Flex-Row Logic
      let rowContent = "";
      let currentLinePx = 0;
      const isSingleItem = items.length === 1;

      items.forEach((item: any, idx: number) => {
        const hasNote = item.note && item.note.trim() !== "";
        if (hasNote) overallNoteIndex++;
        const noteIndex = hasNote ? overallNoteIndex : 0;
        const noteText = noteIndex ? `(${noteIndex})` : "";
        let baseLabel =
          item.type === 1
            ? (item.title || "") + (item.prefix || "")
            : item.title || "";
        if (item.type === 2) {
          if (item.hasCheckboxBefore) baseLabel = "☐ " + baseLabel;
          if (item.hasCheckboxAfter) baseLabel = baseLabel + " ☐";
        }
        const endSuffix = item.type === 1 ? item.suffix || "" : "";
        const labelPx = getTextSegmentWidth(baseLabel + noteText, currentFont);
        const totalFlex = items.reduce(
          (sum: number, i: any) => sum + (Number(i.flex) || 1),
          0,
        );
        const share = (Number(item.flex) || 1) / totalFlex;
        let targetSegmentPx = rowAvailableWidth * share;
        if (idx === items.length - 1)
          targetSegmentPx = rowAvailableWidth - currentLinePx;

        let itemStr = baseLabel;

        if (item.listType === "bullet") {
          itemStr = '<span style="margin-right: 5px;">•</span>' + itemStr;
        } else if (item.listType === "number") {
          listCounter++;
          itemStr =
            `<span style="margin-right: 5px;">${listCounter}.</span>` + itemStr;
        }

        if (noteIndex)
          itemStr += `<span style="color: #6366f1; font-weight: 800; font-size: 0.8em; margin-left: 1px;">(${noteIndex})</span>`;
        if (item.type === 1) {
          const dotsNeededPx = Math.max(0, targetSegmentPx - labelPx);
          const dotsCount = Math.floor(dotsNeededPx / dotPx);
          itemStr += ".".repeat(dotsCount) + endSuffix;
        }

        currentLinePx += targetSegmentPx;

        // Key Fix: If single item, don't use flex-1 width:0 to let Enter create vertical sibling
        const styles = [
          isSingleItem
            ? "width: 100%"
            : `flex: ${Number(item.flex) || 1}; width: 0; min-width: 0`,
          `text-align: ${["left", "center", "right", "justify"][item.textAlign || 0]}`,
          `font-size: ${item.size || 14}px`,
          `color: ${item.color || "#000"}`,
          `background-color: ${item.background || "transparent"}`,
          item.bold ? "font-weight: bold" : "",
          item.italic ? "font-style: italic" : "",
          item.underline ? "text-decoration: underline" : "",
          `line-height: ${item.lineHeight || 1.5}`,
          `box-sizing: border-box`,
          `white-space: pre-wrap`,
          `vertical-align: top`,
        ]
          .filter(Boolean)
          .join(";");

        rowContent += `<div style="${styles}">${itemStr}</div>`;
      });

      const rowWrapperStyle = `width: 100%; display: flex; justify-content: ${rowAlignment};`;
      // Key Fix: If single item, use block layout for the inner container
      const rowInnerStyle = `width: ${rowAvailableWidth}px; ${isSingleItem ? "display: block;" : "display: flex; flex-wrap: wrap;"} align-items: flex-start; flex-shrink: 0;`;
      const rowsCount = items[0]?.row || 1;
      let html = "";
      for (let i = 0; i < rowsCount; i++) {
        if (i === 0) {
          html += `<div style="${rowWrapperStyle}"><div style="${rowInnerStyle}">${rowContent}</div></div>`;
        } else {
          const fullDotsCount = Math.floor(rowAvailableWidth / dotPx);
          html += `<div style="${rowWrapperStyle}"><div style="width: ${rowAvailableWidth}px; min-height: 1.5em; color: #000; flex-shrink: 0; white-space: pre-wrap;">${".".repeat(fullDotsCount)}</div></div>`;
        }
      }
      finalRowContent = html;
    }

    // Dồn tất cả nội dung vào trang đầu tiên (Không ngắt trang nữa)
    if (pagedData.value[0]) {
      pagedData.value[0].content += finalRowContent;
    }
  }

  if (tempDiv.parentNode) {
    document.body.removeChild(tempDiv);
  }
  showStructureModal.value = false;
};

const vFocus = {
  mounted: (el: HTMLInputElement) => el.focus(),
};

const vSafeHtml = {
  mounted(el: HTMLElement, binding: any) {
    el.innerHTML = binding.value || "";
  },
  updated(el: HTMLElement, binding: any) {
    // Only update if content changed and NOT currently focused to avoid jumping
    if (
      el.innerHTML !== binding.value &&
      document.activeElement !== el &&
      !el.contains(document.activeElement)
    ) {
      el.innerHTML = binding.value || "";
    }
  },
};

const pageSetup = ref({
  marginTop: 84,
  marginBottom: 84,
  marginLeft: 94,
  marginRight: 94,
});

const form = ref({
  title: "",
  content: "",
  type: "Complaint",
  documentBody: "",
  config: { fields: [] as any[] },
});

const pagedData = ref([{ id: Date.now(), content: "", headerText: "" }]);

const wordCount = computed(() => {
  return pagedData.value.reduce(
    (acc, p) =>
      acc +
      (p.content
        ? p.content
            .replace(/<[^>]*>/g, " ")
            .trim()
            .split(/\s+/)
            .filter((w) => w !== "").length
        : 0),
    0,
  );
});

// const getAvailableHeight = () =>
//   1123 - pageSetup.value.marginTop - pageSetup.value.marginBottom;

const onContentInput = (idx: number, e: any) => {
  const el = e.target as HTMLElement;
  const content = el.innerHTML;
  if (pagedData.value[idx]) {
    pagedData.value[idx].content = content;
  }
};

// const balancePages = async (startIdx: number) => {
//   // Disabled as per user request: "không phân trang nữa trên 1 tờ giấy dài"
//   return;
// };

const handleKeyDown = (e: KeyboardEvent) => {
  const el = e.target as HTMLElement;
  if (!el) return;
  // Disabled complex pagination jumping since there is only 1 page now
};

const isDragging = ref<string | null>(null);
const draggingTarget = ref<HTMLElement | null>(null);
const dragStartSize = ref(0);
const dragStartPos = ref(0);

const handleEditorMouseDown = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const td = target.closest("td");
  if (!td) return;

  const rect = td.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const tolerance = 8;

  if (Math.abs(rect.width - x) < tolerance) {
    isDragging.value = "col-resize";
    draggingTarget.value = td;
    dragStartSize.value = rect.width;
    dragStartPos.value = e.clientX;
    e.preventDefault();
  } else if (Math.abs(rect.height - y) < tolerance) {
    isDragging.value = "row-resize";
    draggingTarget.value = td;
    dragStartSize.value = rect.height;
    dragStartPos.value = e.clientY;
    e.preventDefault();
  } else {
    // Check for whole table resize at bottom right of the table
    const table = td.closest("table");
    if (table) {
      const tableRect = table.getBoundingClientRect();
      const tx = e.clientX - tableRect.left;
      const ty = e.clientY - tableRect.top;
      if (
        Math.abs(tableRect.width - tx) < tolerance &&
        Math.abs(tableRect.height - ty) < tolerance
      ) {
        isDragging.value = "table-resize";
        draggingTarget.value = table;
        dragStartSize.value = tableRect.width;
        dragStartPos.value = e.clientX;
        e.preventDefault();
      }
    }
  }

  if (isDragging.value && isDragging.value.includes("resize")) {
    document.addEventListener("mousemove", handleTableResize);
    document.addEventListener("mouseup", stopTableResize);
    document.body.style.cursor = isDragging.value;
  }
};

const handleTableResize = (e: MouseEvent) => {
  if (!isDragging.value || !draggingTarget.value) return;

  if (isDragging.value === "col-resize") {
    const delta = e.clientX - dragStartPos.value;
    const newWidth = Math.max(20, dragStartSize.value + delta);
    draggingTarget.value.style.width = `${newWidth}px`;
  } else if (isDragging.value === "row-resize") {
    const delta = e.clientY - dragStartPos.value;
    const newHeight = Math.max(20, dragStartSize.value + delta);
    draggingTarget.value.style.height = `${newHeight}px`;
    // For rows, we might want to set height on the tr if needed, but td height works for fixed layout
    const tr = draggingTarget.value.closest("tr");
    if (tr) tr.style.height = `${newHeight}px`;
  } else if (isDragging.value === "table-resize") {
    const delta = e.clientX - dragStartPos.value;
    const newWidth = Math.max(100, dragStartSize.value + delta);
    draggingTarget.value.style.width = `${newWidth}px`;
    draggingTarget.value.style.tableLayout = "fixed"; // Force fixed layout when manually resizing
  }
};

const stopTableResize = () => {
  if (draggingTarget.value) {
    // Sync back to pagedData
    const pIdx = activePageIndex.value;
    const editorEl = document.getElementById("editor-p-" + pIdx);
    if (editorEl && pagedData.value[pIdx]) {
      // pagedData.value[pIdx].content = editorEl.innerHTML;
    }
  }

  isDragging.value = null;
  draggingTarget.value = null;
  document.removeEventListener("mousemove", handleTableResize);
  document.removeEventListener("mouseup", stopTableResize);
  document.body.style.cursor = "";
};

const handleEditorMouseMove = (e: MouseEvent) => {
  if (isDragging.value && isDragging.value.includes("resize")) return;

  const target = e.target as HTMLElement;
  const td = target.closest("td");
  if (!td) return;

  const rect = td.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const tolerance = 8;

  if (Math.abs(rect.width - x) < tolerance) {
    target.style.cursor = "col-resize";
  } else if (Math.abs(rect.height - y) < tolerance) {
    target.style.cursor = "row-resize";
  } else {
    // Check table corner
    const table = td.closest("table");
    if (table) {
      const tableRect = table.getBoundingClientRect();
      const tx = e.clientX - tableRect.left;
      const ty = e.clientY - tableRect.top;
      if (
        Math.abs(tableRect.width - tx) < tolerance &&
        Math.abs(tableRect.height - ty) < tolerance
      ) {
        target.style.cursor = "nwse-resize";
      } else {
        target.style.cursor = "text";
      }
    }
  }
};

const startDrag = (side: string) => {
  isDragging.value = side;
  document.body.classList.add("no-select-during-drag");
  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);
};

const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  const ruler = document.querySelector(".group\\/ruler") as HTMLElement | null;
  const vruler = document.querySelector(
    ".group\\/vruler",
  ) as HTMLElement | null;
  if (!ruler || !vruler) return;

  if (isDragging.value === "left" || isDragging.value === "right") {
    const rect = ruler.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    if (isDragging.value === "left")
      pageSetup.value.marginLeft = Math.max(20, Math.min(250, offsetX));
    else
      pageSetup.value.marginRight = Math.max(
        20,
        Math.min(250, rect.width - offsetX),
      );
  } else if (isDragging.value === "top" || isDragging.value === "bottom") {
    const rect = vruler.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    if (isDragging.value === "top")
      pageSetup.value.marginTop = Math.max(20, Math.min(300, offsetY));
    else
      pageSetup.value.marginBottom = Math.max(
        20,
        Math.min(300, rect.height - offsetY),
      );
  }
};

const stopDrag = () => {
  isDragging.value = null;
  document.body.classList.remove("no-select-during-drag");
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const fetchData = async () => {
  const id = route.params.id;
  if (isEditing.value && id) {
    try {
      const data = await lawApi.getApplication(id as string);
      if (data) {
        form.value = {
          title: data.title || "",
          content: data.content || "",
          type: data.type || "Complaint",
          documentBody: data.documentBody || "",
          config: data.config || { fields: [] },
        };
        if (form.value.documentBody)
          pagedData.value = [
            {
              id: Date.now(),
              content: form.value.documentBody,
              headerText: "",
            },
          ];
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    form.value.config.fields = [
      { label: "Người nộp đơn", name: "full_name", type: "text" },
      { label: "Ngày sinh", name: "dob", type: "date" },
    ];
  }
};

const insertPlaceholderAtActivePage = (key: string) => {
  if (!key) return;
  const idx = activePageIndex.value;
  const editorEl = document.getElementById("editor-p-" + idx);
  if (!editorEl) return;

  // Ensure editor is focused
  editorEl.focus();

  // Premium insertion using Range API
  const sel = window.getSelection();
  if (sel && sel.getRangeAt && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(`{{${key}}}`);
    range.insertNode(textNode);

    // Move cursor after the inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    // Fallback: Append at the end
    const page = pagedData.value[idx];
    if (page) page.content += `{{${key}}}`;
  }
};

const insertTable = (dims?: { rows: number; cols: number }) => {
  let rowsNum = dims?.rows;
  let colsNum = dims?.cols;

  // Fallback if no dims provided
  if (!rowsNum || !colsNum) {
    rowsNum = 3;
    colsNum = 3;
  }

  // Generate Real HTML Table for direct insertion
  let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 15px 0; table-layout: fixed; font-size: ${builderData.value.format.size}px;">`;
  for (let r = 0; r < rowsNum; r++) {
    tableHtml += "<tr>";
    for (let c = 0; c < colsNum; c++) {
      tableHtml += `<td style="border: 0.5pt solid #000; padding: 10px; min-height: 1.5em; vertical-align: top; box-sizing: border-box;">&nbsp;</td>`;
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table><p>&nbsp;</p>";

  // Focus the editor and insert at cursor
  const editorId = `editor-p-${activePageIndex.value}`;
  const editorEl = document.getElementById(editorId);
  if (editorEl) {
    editorEl.focus();
    document.execCommand("insertHTML", false, tableHtml);
  } else {
    // Just append if ID not found for any reason
    const page = pagedData.value[activePageIndex.value];
    if (page) page.content += tableHtml;
  }
};

const handleSave = async () => {
  if (!form.value.title) {
    const t = prompt("Nhập tiêu đề cho mẫu đơn:", "Mẫu đơn mới");
    if (!t) return;
    form.value.title = t;
  }
  const id = route.params.id;
  form.value.documentBody = pagedData.value.map((p) => p.content).join("\n");
  isSaving.value = true;
  try {
    if (isEditing.value && id)
      await lawApi.updateApplication(id as string, form.value);
    else await lawApi.createApplication(form.value);
    router.push("/law-admin/applications");
  } catch (err) {
    console.error(err);
  } finally {
    isSaving.value = false;
  }
};

onMounted(fetchData);
onUnmounted(stopDrag);
</script>

<style scoped>
textarea {
  outline: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.transition-all {
  transition-duration: 300ms;
}
:global(.no-select-during-drag) {
  user-select: none !important;
}

/* Lag recovery: disable all transitions during drag */
.dragging-mode .transition-all {
  transition: none !important;
}

.law-field-highlight {
  transition: all 0.3s ease-out;
}

.law-field-highlight:hover {
  background-color: rgba(20, 184, 166, 0.1) !important;
  box-shadow: 0 0 15px rgba(20, 184, 166, 0.1);
  cursor: pointer;
}
</style>
