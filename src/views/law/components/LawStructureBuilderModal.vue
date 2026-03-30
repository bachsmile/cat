<script setup lang="ts">
import { ref } from "vue";
import {
  X as XIcon,
  Layout as LayoutIcon,
  Type as TypeIcon,
  Edit2 as EditIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  AlignJustify as AlignJustifyIcon,
  CheckSquare as CheckSquareIcon,
  Table as TableIcon,
  Code as CodeIcon,
  Copy as CopyIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
} from "lucide-vue-next";

const props = defineProps<{
  show: boolean;
  builderData: any;
  pageSetup: {
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
  };
  selectedFont: string;
}>();

const emit = defineEmits(["close", "generate"]);

// Persistent hidden canvas for performance
const measureCanvas = document.createElement("canvas");
const measureContext = measureCanvas.getContext("2d");

const getTextSegmentWidth = (text: string, font: string) => {
  if (!measureContext) return text.length * 8;
  measureContext.font = font;
  return measureContext.measureText(text).width;
};

const calculateRowWidth = (rowObj: any, rIdx: number) => {
  const currentFont = `${Number(props.builderData.format.size)}px ${
    props.selectedFont
  }`;
  const items = rowObj.items || rowObj;
  return items.reduce((sum: number, item: any, iIdx: number) => {
    let label =
      Number(item.type) === 1
        ? `${item.title || ""}${item.prefix || ""}${item.suffix || ""}`
        : item.title || "";
    if (item.note && item.note.trim() !== "") {
      const idx = getNoteIndex(rIdx, iIdx);
      if (idx) label += `(${idx})`;
    }
    return sum + getTextSegmentWidth(label, currentFont);
  }, 0);
};

const getAlignIconForVal = (val: number) => {
  const options = [
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    AlignJustifyIcon,
  ];
  return options[val] || AlignLeftIcon;
};

const getNoteIndex = (rIdx: number, iIdx: number) => {
  let count = 0;
  for (let r = 0; r < props.builderData.content.length; r++) {
    const rowObj = props.builderData.content[r];
    const items = rowObj.items || [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.note && item.note.trim() !== "") {
        count++;
        if (r === rIdx && i === iIdx) return count;
      }
    }
  }
  return null;
};

const addAutoGuides = () => {
  const guideRows: any[] = [];

  // 1. Header Row
  guideRows.push({
    fullWidth: true,
    items: [
      {
        title: "Hướng dẫn sử dụng mẫu",
        bold: true,
        italic: true,
        underline: true,
        size: 14,
        textAlign: 0,
        color: "#2563eb",
        background: "transparent",
        key: "",
        row: 1,
        type: 0,
        flex: 1,
        prefix: "",
        suffix: "",
        note: "",
      },
    ],
  });

  // 2. Identify all notes and their global indices
  const notesMap = new Map<string, number[]>();
  let globalCounter = 0;

  props.builderData.content.forEach((rowObj: any) => {
    const items = rowObj.items || [];
    items.forEach((item: any) => {
      if (item.note && item.note.trim() !== "") {
        globalCounter++;
        const text = item.note.trim();
        if (!notesMap.has(text)) {
          notesMap.set(text, []);
        }
        notesMap.get(text)!.push(globalCounter);
      }
    });
  });

  // 3. Generate grouped rows
  notesMap.forEach((indices, noteText) => {
    let indexLabel = "";
    if (indices.length === 1) {
      indexLabel = `(${indices[0]})`;
    } else {
      const allButLast = indices.slice(0, -1);
      const last = indices[indices.length - 1];
      indexLabel = allButLast.map((i) => `(${i})`).join(", ") + ` và (${last})`;
    }

    guideRows.push({
      fullWidth: true,
      items: [
        {
          title: `${indexLabel} ${noteText}`,
          bold: false,
          italic: true,
          underline: false,
          size: 12,
          textAlign: 3,
          color: "#2563eb",
          background: "transparent",
          key: "",
          row: 1,
          type: 0,
          flex: 1,
          prefix: "",
          suffix: "",
          note: "",
          lineHeight: 1.5,
          listType: "none",
        },
      ],
    });
  });

  if (guideRows.length > 1) {
    props.builderData.content.push(...guideRows);
  }
};

const addItem = (rIdx: number) => {
  props.builderData.content[rIdx].items.push({
    title: "",
    bold: false,
    italic: false,
    underline: false,
    size: 14,
    textAlign: 0,
    color: "#111827",
    background: "transparent",
    key: "",
    row: 1,
    type: 1,
    flex: 1,
    note: "",
    prefix: ": ",
    suffix: "",
    hasCheckboxBefore: false,
    hasCheckboxAfter: false,
  });
};

const addRow = () => {
  props.builderData.content.push({
    fullWidth: true,
    textAlign: 0,
    items: [
      {
        title: "",
        bold: false,
        italic: false,
        underline: false,
        size: 14,
        textAlign: 0,
        color: "#111827",
        background: "transparent",
        key: "",
        row: 1,
        type: 1,
        flex: 1,
        note: "",
        prefix: ": ",
        suffix: "",
        hasCheckboxBefore: false,
        hasCheckboxAfter: false,
        lineHeight: 1.5,
        listType: "none",
      },
    ],
  });
};

const showQuickImport = ref(false);
const quickImportText = ref("");

const handleQuickImport = () => {
  if (!quickImportText.value.trim()) return;

  let lines = quickImportText.value
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l);

  // Smart Merge: Join lines that were likely wrapped by mistake
  const cleanedLines: string[] = [];
  let currentParagraph = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (currentParagraph) {
      currentParagraph += " " + line;
    } else {
      currentParagraph = line;
    }

    // If it ends with a delimiter or is followed by an empty line in source (which we filtered, but we can check original)
    // Or if it's very long, assume it's a finished thought
    const endsWithDelimiter = /[.:?!]$|__+|[.]{3,}$/.test(line);
    if (endsWithDelimiter || i === lines.length - 1) {
      cleanedLines.push(currentParagraph);
      currentParagraph = "";
    }
  }

  cleanedLines.forEach((line) => {
    // If the line is only dots or underscores, it belongs to the previous item
    if (/^[.\s_\-]+$/.test(line) && props.builderData.content.length > 0) {
      const lastRow =
        props.builderData.content[props.builderData.content.length - 1];
      if (lastRow.items && lastRow.items.length > 0) {
        // Merge into the LAST item of the row (more common for date rows etc)
        const lastItemIdx = lastRow.items.length - 1;
        lastRow.items[lastItemIdx].row =
          (lastRow.items[lastItemIdx].row || 1) + 1;
        return;
      }
    }

    let title = line;
    let type = 0; // Text
    let prefix = "";

    if (line.includes(":")) {
      const lastColonIdx = line.lastIndexOf(":");
      const partBefore = line.substring(0, lastColonIdx).trim();
      const partAfter = line.substring(lastColonIdx + 1).trim();

      if (
        !partAfter ||
        /^[\s.]+$/.test(partAfter) ||
        partAfter.startsWith("(")
      ) {
        title = partBefore.replace(/\.+$/, "").trim() || "";
        type = 1; // Input
        prefix = ": ";
      } else {
        title = line.trim().replace(/\.+$/, "").trim() || "";
      }
    } else {
      title = line.trim().replace(/\.+$/, "").trim() || "";
    }

    props.builderData.content.push({
      fullWidth: true,
      textAlign: 0,
      items: [
        {
          title,
          bold: type === 0,
          italic: false,
          underline: false,
          size: 14,
          textAlign: 0,
          color: "#111827",
          background: "transparent",
          key: "",
          row: 1,
          type,
          flex: 1,
          note: "",
          prefix,
          suffix: "",
          lineHeight: 1.5,
          listType: "none",
          hasCheckboxBefore: false,
          hasCheckboxAfter: false,
        },
      ],
    });
  });

  quickImportText.value = "";
  showQuickImport.value = false;
};

const showTableSelector = ref(false);
const hoveredCols = ref(0);
const hoveredRows = ref(0);

const showJsonView = ref(false);
const jsonText = ref("");

const handleOpenJsonView = () => {
  jsonText.value = JSON.stringify(props.builderData.content, null, 2);
  showJsonView.value = true;
};

const handleImportJson = () => {
  try {
    const imported = JSON.parse(jsonText.value);
    if (Array.isArray(imported)) {
      props.builderData.content = imported;
      showJsonView.value = false;
      alert("Đã nhập dữ liệu thành công!");
    } else {
      alert("Dữ liệu JSON không hợp lệ (phải là mảng các hàng).");
    }
  } catch (e) {
    alert("Không thể đọc được mã JSON. Vui lòng kiểm tra lại định dạng.");
  }
};

const copyJson = () => {
  navigator.clipboard.writeText(jsonText.value).then(() => {
    alert("Đã copy JSON vào bộ nhớ đệm!");
  });
};

const addTable = (cols: number, rows: number) => {
  for (let r = 0; r < rows; r++) {
    const items = [];
    for (let c = 0; c < cols; c++) {
      items.push({
        title: "",
        bold: false,
        italic: false,
        underline: false,
        size: 14,
        textAlign: 0,
        color: "#111827",
        background: "transparent",
        key: "",
        row: 1,
        type: 0,
        flex: 1,
        note: "",
        prefix: "",
        suffix: "",
        hasCheckboxBefore: false,
        hasCheckboxAfter: false,
      });
    }
    props.builderData.content.push({
      fullWidth: true,
      textAlign: 0,
      isTable: true,
      items,
    });
  }
  showTableSelector.value = false;
};

const handleTableHover = (r: number, c: number) => {
  hoveredRows.value = r;
  hoveredCols.value = c;
};

const removeRow = (rIdx: number) => props.builderData.content.splice(rIdx, 1);
const removeItem = (rIdx: number, iIdx: number) => {
  const rowObj = props.builderData.content[rIdx];
  if (rowObj && rowObj.items) {
    rowObj.items.splice(iIdx, 1);
    if (rowObj.items.length === 0) removeRow(rIdx);
  }
};

const systemModules = [
  {
    name: "Tiêu ngữ Quốc gia",
    description: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
    icon: "📜",
    rows: [
      {
        fullWidth: true,
        items: [
          {
            title: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
            bold: true,
            size: 13,
            textAlign: 1,
            row: 1,
            type: 0,
            flex: 1,
          },
        ],
      },
      {
        fullWidth: true,
        items: [
          {
            title: "Độc lập - Tự do - Hạnh phúc",
            bold: true,
            underline: true,
            size: 14,
            textAlign: 1,
            row: 1,
            type: 0,
            flex: 1,
          },
        ],
      },
    ],
  },
  {
    name: "Tên đơn",
    description: "Tiêu đề tài liệu (Vd: ĐƠN KHỞI KIỆN)",
    icon: "📑",
    rows: [
      {
        fullWidth: true,
        textAlign: 1,
        items: [
          {
            title: "ĐƠN KHỞI KIỆN",
            bold: true,
            size: 18,
            textAlign: 1,
            row: 1,
            type: 0,
            flex: 1,
            color: "#1d4ed8",
            background: "transparent",
          },
        ],
      },
      {
        fullWidth: true,
        textAlign: 1,
        items: [
          {
            title: "về việc",
            italic: true,
            size: 14,
            textAlign: 1,
            row: 1,
            type: 1,
            flex: 1,
            prefix: " ",
            suffix: " ",
            color: "#1d4ed8",
            background: "transparent",
          },
        ],
      },
    ],
  },
  {
    name: "Bộ Ngày tháng",
    description: "......, ngày ...... tháng ...... năm ......",
    icon: "📅",
    rows: [
      {
        fullWidth: false,
        textAlign: 2,
        items: [
          {
            title: "",
            italic: true,
            size: 14,
            textAlign: 2,
            row: 1,
            type: 1,
            flex: 2,
            prefix: "",
            suffix: ",",
            note: "Địa điểm",
          },
          {
            title: "ngày",
            italic: true,
            size: 14,
            textAlign: 1,
            row: 1,
            type: 1,
            flex: 1,
            prefix: "",
            suffix: "",
            note: "",
          },
          {
            title: "tháng",
            italic: true,
            size: 14,
            textAlign: 1,
            row: 1,
            type: 1,
            flex: 1,
            prefix: "",
            suffix: "",
            note: "",
          },
          {
            title: "năm",
            italic: true,
            size: 14,
            textAlign: 1,
            row: 1,
            type: 1,
            flex: 1,
            prefix: "",
            suffix: "",
            note: "",
          },
        ],
      },
    ],
  },
  {
    name: "✨ Hướng dẫn Tự động",
    description: "Tạo bảng hướng dẫn từ các ghi chú bạn đã viết ở trên",
    icon: "🪄",
    action: "autoGuides",
    rows: [],
  },
];

const showSidebar = ref(false);

const handleModuleClick = (module: any) => {
  if (module.action === "autoGuides") {
    addAutoGuides();
  } else {
    addFromModule(module);
  }
};

const isDragging = ref(false);
const dragStartPageX = ref(0);
const dragStartPageY = ref(0);
const dragStartSize = ref(0);
const dragStartFlexA = ref(0);
const dragStartFlexB = ref(0);
const activeResizer = ref<{ rIdx: number; iIdx: number } | null>(null);

const startResizing = (e: MouseEvent, rIdx: number, iIdx: number) => {
  e.preventDefault();
  isDragging.value = true;
  dragStartPageX.value = e.pageX;
  activeResizer.value = { rIdx, iIdx };

  const row = props.builderData.content[rIdx];
  dragStartFlexA.value = Number(row.items[iIdx].flex) || 1;
  dragStartFlexB.value = Number(row.items[iIdx + 1].flex) || 1;

  document.addEventListener("mousemove", handleResizing);
  document.addEventListener("mouseup", stopResizing);
  document.body.style.cursor = "col-resize";
};

const handleResizing = (e: MouseEvent) => {
  if (!isDragging.value || !activeResizer.value) return;

  const deltaX = e.pageX - dragStartPageX.value;
  // Sensitivity factor: 1 flex unit per 100px (approximate)
  const sensitivity = 100;
  const flexDelta = deltaX / sensitivity;

  const { rIdx, iIdx } = activeResizer.value;
  const row = props.builderData.content[rIdx];

  const newFlexA = Math.max(0.1, dragStartFlexA.value + flexDelta);
  const newFlexB = Math.max(0.1, dragStartFlexB.value - flexDelta);

  row.items[iIdx].flex = Number(newFlexA.toFixed(2));
  row.items[iIdx + 1].flex = Number(newFlexB.toFixed(2));
};

const stopResizing = () => {
  isDragging.value = false;
  activeResizer.value = null;
  document.removeEventListener("mousemove", handleResizing);
  document.removeEventListener("mouseup", stopResizing);
  document.body.style.cursor = "";
};

const startRowResizing = (e: MouseEvent, rIdx: number) => {
  e.preventDefault();
  isDragging.value = true;
  dragStartPageY.value = e.pageY;
  activeResizer.value = { rIdx, iIdx: -1 }; // -1 indicates row resizing

  const row = props.builderData.content[rIdx];
  dragStartSize.value = Number(row.minHeight) || 0;

  document.addEventListener("mousemove", handleRowResizing);
  document.addEventListener("mouseup", stopRowResizing);
  document.body.style.cursor = "row-resize";
};

const handleRowResizing = (e: MouseEvent) => {
  if (!isDragging.value || !activeResizer.value) return;

  const deltaY = e.pageY - dragStartPageY.value;
  const { rIdx } = activeResizer.value;
  const row = props.builderData.content[rIdx];

  const newHeight = Math.max(0, dragStartSize.value + deltaY);
  row.minHeight = Number(newHeight.toFixed(0));
};

const stopRowResizing = () => {
  isDragging.value = false;
  activeResizer.value = null;
  document.removeEventListener("mousemove", handleRowResizing);
  document.removeEventListener("mouseup", stopRowResizing);
  document.body.style.cursor = "";
};

const getColumnResizerPosition = (row: any, iIdx: number) => {
  const totalFlex = row.items.reduce(
    (sum: number, item: any) => sum + (Number(item.flex) || 1),
    0,
  );
  const currentFlex = row.items
    .slice(0, iIdx)
    .reduce((sum: number, item: any) => sum + (Number(item.flex) || 1), 0);
  return `${(currentFlex / totalFlex) * 100}%`;
};

const onDragStart = (e: DragEvent, module: any) => {
  e.dataTransfer?.setData("application/json", JSON.stringify(module));
  e.dataTransfer!.effectAllowed = "copy";
};

const dragSourceRow = ref<number | null>(null);
const dragOverRow = ref<{ index: number; position: "top" | "bottom" } | null>(
  null,
);

const handleDragRowStart = (e: DragEvent, rIdx: number) => {
  dragSourceRow.value = rIdx;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("row-index", rIdx.toString());
  }
};

const handleDragRowOver = (e: DragEvent, rIdx: number) => {
  e.preventDefault();
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const y = e.clientY - rect.top;
  const position = y < rect.height / 2 ? "top" : "bottom";
  dragOverRow.value = { index: rIdx, position };

  if (e.dataTransfer) {
    const isNew = e.dataTransfer.types.some(
      (t) => t.toLowerCase() === "application/json",
    );
    e.dataTransfer.dropEffect = isNew ? "copy" : "move";
  }
};

const handleDragRowLeave = (e: DragEvent) => {
  // Only clear if we actually left the row container, not a child
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX;
  const y = e.clientY;
  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
    dragOverRow.value = null;
  }
};

const handleDragOverContainer = (e: DragEvent) => {
  e.preventDefault();
  const container = e.currentTarget as HTMLElement;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const threshold = 120;
  const scrollSpeed = 15;

  if (e.clientY < rect.top + threshold) {
    container.scrollTop -= scrollSpeed;
  } else if (e.clientY > rect.bottom - threshold) {
    container.scrollTop += scrollSpeed;
  }
};

const handleDropRow = (e: DragEvent, targetIdx: number) => {
  e.preventDefault();
  const sourceIdx = dragSourceRow.value;
  const dragPos = dragOverRow.value;

  if (sourceIdx !== null) {
    let finalTargetIdx = targetIdx;
    if (dragPos && dragPos.position === "bottom") finalTargetIdx++;

    // Adjust target index if source is before target
    if (sourceIdx < finalTargetIdx) finalTargetIdx--;

    if (sourceIdx !== finalTargetIdx) {
      const rows = props.builderData.content;
      const item = rows.splice(sourceIdx, 1)[0];
      rows.splice(Math.max(0, finalTargetIdx), 0, item);
    }
  }
  dragSourceRow.value = null;
  dragOverRow.value = null;
};

const handleDropModule = (e: DragEvent, targetIdx?: number) => {
  e.preventDefault();
  const data = e.dataTransfer?.getData("application/json");
  const rowIndexData = e.dataTransfer?.getData("row-index");
  const dragPos = dragOverRow.value;

  // We handle row move above, but if it came from unified drop:
  // If targetIdx is undefined, it means dropping on the main container background (move to end)
  if (rowIndexData) {
    handleDropRow(e, targetIdx ?? props.builderData.content.length);
    return;
  }

  if (data) {
    const module = JSON.parse(data);
    if (module.action === "autoGuides") {
      addAutoGuides();
    } else if (module.rows) {
      const newRows = Array.isArray(module.rows)
        ? module.rows.map((r: any) =>
            typeof r === "object" && r.items
              ? r
              : { items: r, fullWidth: true, textAlign: 0 },
          )
        : [];

      let insertIdx =
        targetIdx !== undefined ? targetIdx : props.builderData.content.length;
      if (
        dragPos &&
        dragPos.index === targetIdx &&
        dragPos.position === "bottom"
      ) {
        insertIdx++;
      }

      props.builderData.content.splice(
        insertIdx,
        0,
        ...JSON.parse(JSON.stringify(newRows)),
      );
    }
  }
  dragOverRow.value = null;
};

const addFromModule = (module: any) => {
  props.builderData.content.push(...JSON.parse(JSON.stringify(module.rows)));
};

const onGenerate = () => {
  emit("generate");
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300"
  >
    <div
      class="absolute inset-0 bg-black/80 backdrop-blur-md"
      @click="emit('close')"
    ></div>
    <div
      class="relative w-full max-w-[98vw] h-[92vh] bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
    >
      <!-- Header -->
      <div
        class="flex-shrink-0 p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/20">
            <LayoutIcon class="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <h3 class="text-xl font-black tracking-tighter text-white">
              Cấu trúc <span class="text-teal-400">Văn bản Form</span>
            </h3>
            <p
              class="text-[9px] text-gray-500 uppercase tracking-widest font-bold"
            >
              Word Engine Architect v2.0
            </p>
          </div>
        </div>
        <button
          @click="emit('close')"
          class="p-2 hover:bg-white/5 rounded-xl text-gray-500 transition-colors"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 flex overflow-hidden bg-[#050508]">
        <!-- Left Sidebar for System Modules -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="-translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="-translate-x-full opacity-0"
        >
          <div
            v-if="showSidebar"
            class="w-80 border-r border-white/5 bg-white/[0.01] flex flex-col z-20 shrink-0"
          >
            <div
              class="p-5 border-b border-white/5 flex items-center justify-between"
            >
              <h4
                class="text-[10px] font-black text-gray-400 uppercase tracking-widest"
              >
                Mẫu Hệ Thống
              </h4>
              <button
                @click="showSidebar = false"
                class="p-1 hover:bg-white/5 rounded-lg text-gray-500 transition-colors"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <div
                v-for="(module, mIdx) in systemModules"
                :key="mIdx"
                draggable="true"
                @dragstart="onDragStart($event, module)"
                @click="handleModuleClick(module)"
                class="group cursor-grab active:cursor-grabbing bg-[#0d0d14] border border-white/5 rounded-2xl p-4 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all"
              >
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xl">{{ module.icon }}</span>
                  <span class="text-[11px] font-bold text-white">{{
                    module.name
                  }}</span>
                </div>
                <p class="text-[9px] text-gray-500 leading-relaxed">
                  {{ module.description }}
                </p>
                <div
                  class="mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <span class="text-[8px] font-black text-teal-400 uppercase"
                    >Kéo hoặc Bấm để thêm</span
                  >
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Main Content Area -->
        <div
          class="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide scroll-smooth"
          @dragover="handleDragOverContainer"
          @drop.prevent="handleDropModule"
        >
          <div
            v-if="builderData.content.length === 0"
            class="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-20"
            @dragover.prevent
            @drop.stop="handleDropModule($event, 0)"
          >
            <div class="p-8 bg-white/5 rounded-[3rem] border border-white/10">
              <LayoutIcon class="w-16 h-16 text-gray-500" />
            </div>
            <div class="space-y-2">
              <h4 class="text-xl font-bold text-white">Chưa có cấu trúc nào</h4>
              <p class="text-sm text-gray-500">
                Hãy kéo mẫu từ hệ thống hoặc thêm hàng mới vào đây
              </p>
            </div>
          </div>

          <div
            v-for="(rowObj, rIdx) in builderData.content"
            :key="rIdx"
            @dragover="handleDragRowOver($event, Number(rIdx))"
            @dragleave="handleDragRowLeave"
            @drop.stop="handleDropModule($event, Number(rIdx))"
            class="relative group/row bg-[#0d0d14] border border-white/5 rounded-3xl p-6 shadow-xl border-l-4 border-l-teal-500/30 mb-6 last:mb-0 transition-all overflow-hidden"
            :class="{
              'opacity-30 scale-[0.98] blur-[2px]': dragSourceRow === rIdx,
              'border-t-4 border-t-teal-500 shadow-[inset_0_10px_10px_-10px_rgba(20,184,166,0.5)]':
                dragOverRow?.index === rIdx && dragOverRow?.position === 'top',
              'border-b-4 border-b-teal-500 shadow-[inset_0_-10px_10px_-10px_rgba(20,184,166,0.5)]':
                dragOverRow?.index === rIdx &&
                dragOverRow?.position === 'bottom',
              'ring-1 ring-white/10 ring-inset': rowObj.isTable,
            }"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                  <!-- Drag Handle -->
                  <div
                    class="cursor-move p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-teal-400 transition-colors"
                    draggable="true"
                    @dragstart="handleDragRowStart($event, Number(rIdx))"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 8h16M4 16h16"
                      ></path>
                    </svg>
                  </div>

                  <div
                    class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-teal-400 border border-white/10"
                  >
                    {{ Number(rIdx) + 1 }}
                  </div>
                  <span
                    class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]"
                    >HÀNG CỦA VĂN BẢN (Px:
                    {{
                      Math.round(
                        Number(calculateRowWidth(rowObj, Number(rIdx))),
                      )
                    }}
                    /
                    {{
                      Math.round(
                        794 - (pageSetup.marginLeft + pageSetup.marginRight),
                      )
                    }})</span
                  >
                </div>

                <!-- Row Setting Toggle -->
                <div
                  class="flex p-1 bg-white/5 rounded-xl border border-white/5 scale-90 origin-left"
                >
                  <button
                    @click="rowObj.fullWidth = true"
                    :class="
                      rowObj.fullWidth !== false
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-gray-500 hover:text-white'
                    "
                    class="px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all"
                  >
                    Full hàng
                  </button>
                  <button
                    @click="rowObj.fullWidth = false"
                    :class="
                      rowObj.fullWidth === false
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-gray-500 hover:text-white'
                    "
                    class="px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all"
                  >
                    Fix Content
                  </button>
                </div>

                <!-- Row Alignment Setting -->
                <div
                  class="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5 scale-90 origin-left"
                >
                  <button
                    v-for="aIdx in [0, 1, 2, 3]"
                    :key="aIdx"
                    @click="rowObj.textAlign = aIdx"
                    :class="
                      (rowObj.textAlign ?? 0) === aIdx
                        ? 'bg-teal-500 text-white shadow-lg'
                        : 'text-gray-500 hover:text-white'
                    "
                    class="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
                  >
                    <component
                      :is="getAlignIconForVal(aIdx)"
                      class="w-3.5 h-3.5"
                    />
                  </button>
                </div>

                <!-- Table Mode Toggle -->
                <button
                  @click="rowObj.isTable = !rowObj.isTable"
                  :class="
                    rowObj.isTable
                      ? 'bg-teal-500 text-white shadow-lg border-teal-500/50'
                      : 'bg-white/5 text-gray-500 hover:text-white border-white/5'
                  "
                  class="flex items-center gap-2 px-3 py-1 rounded-xl text-[9px] font-black uppercase border transition-all scale-90 origin-left"
                >
                  <TableIcon class="w-3.5 h-3.5" />
                  Bảng
                </button>
              </div>

              <div class="flex gap-4">
                <button
                  @click="addItem(Number(rIdx))"
                  class="px-4 py-1.5 bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-white rounded-xl text-[9px] font-black uppercase transition-all"
                >
                  + Thêm ô
                </button>
                <button
                  @click="removeRow(Number(rIdx))"
                  class="px-4 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[9px] font-black uppercase transition-all"
                >
                  Xóa hàng
                </button>
              </div>
            </div>

            <div
              :class="[
                rowObj.isTable
                  ? 'flex border border-white/10 rounded-2xl overflow-visible bg-black/20 relative'
                  : 'grid grid-cols-1 xl:grid-cols-2 gap-6',
              ]"
              :style="
                rowObj.isTable && rowObj.minHeight
                  ? { minHeight: `${rowObj.minHeight}px` }
                  : {}
              "
            >
              <template
                v-for="(item, iIdx) in (rowObj.items as any[]) || []"
                :key="iIdx"
              >
                <!-- Resizer Handle -->
                <div
                  v-if="rowObj.isTable && (iIdx as number) > 0"
                  class="absolute top-0 bottom-0 w-2 -ml-1 hover:bg-teal-500/40 cursor-col-resize z-10 transition-colors group/resizer"
                  :style="{
                    left: getColumnResizerPosition(rowObj, iIdx as number),
                  }"
                  @mousedown="
                    startResizing($event, Number(rIdx), (iIdx as number) - 1)
                  "
                >
                  <div
                    class="absolute inset-y-0 left-1/2 -ml-[0.5px] w-[1px] bg-white/10 group-hover/resizer:bg-teal-400"
                  ></div>
                </div>

                <div
                  :class="[
                    rowObj.isTable
                      ? 'min-w-0 p-4 space-y-4 relative group/item hover:bg-white/[0.03] transition-all border-r border-white/10 last:border-r-0'
                      : 'bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4 relative group/item hover:border-teal-500/30 transition-all',
                    !rowObj.isTable &&
                    (rowObj.items || []).length % 2 !== 0 &&
                    iIdx === (rowObj.items || []).length - 1
                      ? 'xl:col-span-2'
                      : '',
                  ]"
                  :style="rowObj.isTable ? { flex: item.flex || 1 } : {}"
                >
                  <button
                    @click="removeItem(Number(rIdx), iIdx as number)"
                    class="absolute -top-3 -right-3 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all shadow-xl hover:scale-110 z-10"
                  >
                    <XIcon class="w-3.5 h-3.5" />
                  </button>

                  <div class="space-y-4">
                    <!-- Thể loại Selection -->
                    <div
                      class="flex p-1 bg-white/5 rounded-2xl border border-white/5 w-fit"
                    >
                      <button
                        @click="item.type = 0"
                        :class="
                          item.type === 0
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'text-gray-500 hover:text-white'
                        "
                        class="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2"
                      >
                        <TypeIcon class="w-3 h-3" /> Văn bản
                      </button>
                      <button
                        @click="item.type = 1"
                        :class="
                          item.type === 1
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'text-gray-500 hover:text-white'
                        "
                        class="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2"
                      >
                        <EditIcon class="w-3 h-3" /> Ô điền
                      </button>
                      <button
                        @click="item.type = 2"
                        :class="
                          item.type === 2
                            ? 'bg-teal-500 text-white shadow-lg'
                            : 'text-gray-500 hover:text-white'
                        "
                        class="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2"
                      >
                        <CheckSquareIcon class="w-3 h-3" /> Checkbox
                      </button>
                    </div>

                    <div
                      class="grid grid-cols-[4fr_0.8fr_0.8fr] gap-3 items-stretch"
                    >
                      <div class="flex flex-col">
                        <div class="flex items-center justify-between h-5 ml-1">
                          <label
                            class="text-[8px] font-black text-gray-500 uppercase tracking-widest"
                            >Nội dung (Label)</label
                          >
                          <span
                            class="text-[8px] font-bold text-teal-500/80 bg-teal-500/10 px-1.5 py-0.5 rounded"
                          >
                            {{
                              (item.title?.length || 0) +
                              (item.note ? item.note.length + 2 : 0)
                            }}
                            kí tự
                          </span>
                        </div>
                        <textarea
                          v-model="item.title"
                          rows="2"
                          class="w-full h-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] text-white outline-none focus:border-teal-500 transition-all font-medium resize-none"
                          placeholder="Nội dung văn bản..."
                        ></textarea>
                      </div>
                      <div class="flex flex-col" v-if="Number(item.type) === 1">
                        <div class="flex items-center h-5 ml-1">
                          <label
                            class="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center w-full"
                            >Trước</label
                          >
                        </div>
                        <input
                          v-model="item.prefix"
                          class="w-full flex-1 bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-[11px] text-teal-400 outline-none focus:border-teal-500 transition-all text-center"
                          placeholder=": "
                        />
                      </div>
                      <div class="flex flex-col" v-if="Number(item.type) === 2">
                        <div class="flex items-center h-5 ml-1">
                          <label
                            class="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center w-full"
                            >Check trước</label
                          >
                        </div>
                        <button
                          @click="
                            item.hasCheckboxBefore = !item.hasCheckboxBefore
                          "
                          class="w-full flex-1 flex items-center justify-center rounded-xl border transition-all"
                          :class="
                            item.hasCheckboxBefore
                              ? 'bg-teal-500/20 border-teal-500/50 text-teal-400'
                              : 'bg-white/5 border-white/10 text-gray-600 hover:text-white'
                          "
                        >
                          <CheckSquareIcon
                            v-if="item.hasCheckboxBefore"
                            class="w-4 h-4"
                          />
                          <div
                            v-else
                            class="w-4 h-4 border border-current rounded-sm opacity-20"
                          ></div>
                        </button>
                      </div>
                      <div class="flex flex-col" v-if="Number(item.type) === 1">
                        <div class="flex items-center h-5 ml-1">
                          <label
                            class="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center w-full"
                            >Sau</label
                          >
                        </div>
                        <input
                          v-model="item.suffix"
                          class="w-full flex-1 bg-white/5 border border-white/10 rounded-xl px-2 py-2 text-[11px] text-teal-400 outline-none focus:border-teal-500 transition-all text-center"
                          placeholder=""
                        />
                      </div>
                      <div class="flex flex-col" v-if="Number(item.type) === 2">
                        <div class="flex items-center h-5 ml-1">
                          <label
                            class="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center w-full"
                            >Check sau</label
                          >
                        </div>
                        <button
                          @click="
                            item.hasCheckboxAfter = !item.hasCheckboxAfter
                          "
                          class="w-full flex-1 flex items-center justify-center rounded-xl border transition-all"
                          :class="
                            item.hasCheckboxAfter
                              ? 'bg-teal-500/20 border-teal-500/50 text-teal-400'
                              : 'bg-white/5 border-white/10 text-gray-600 hover:text-white'
                          "
                        >
                          <CheckSquareIcon
                            v-if="item.hasCheckboxAfter"
                            class="w-4 h-4"
                          />
                          <div
                            v-else
                            class="w-4 h-4 border border-current rounded-sm opacity-20"
                          ></div>
                        </button>
                      </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4">
                      <div class="space-y-1.5">
                        <label
                          class="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1"
                          >Độ rộng</label
                        >
                        <input
                          type="number"
                          v-model="item.flex"
                          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none"
                        />
                      </div>
                      <div class="space-y-1.5">
                        <label
                          class="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1"
                          >Dòng chấm</label
                        >
                        <input
                          type="number"
                          v-model="item.row"
                          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none"
                        />
                      </div>
                      <div class="space-y-1.5">
                        <label
                          class="text-[8px] font-black text-gray-500 uppercase tracking-widest ml-1"
                          >Cỡ chữ</label
                        >
                        <input
                          type="number"
                          v-model="item.size"
                          class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none"
                        />
                      </div>
                      <div v-if="rowObj.isTable" class="space-y-1.5">
                        <label
                          class="text-[8px] font-black text-teal-400 uppercase tracking-widest ml-1"
                          >Đệm (Padding)</label
                        >
                        <input
                          type="number"
                          v-model="item.padding"
                          class="w-full bg-teal-400/5 border border-teal-400/20 rounded-xl px-4 py-2.5 text-[11px] text-white outline-none"
                          placeholder="8"
                        />
                      </div>
                      <div
                        class="space-y-1.5"
                        :class="rowObj.isTable ? '' : 'col-span-2'"
                      >
                        <label
                          class="text-[8px] font-black text-indigo-400 uppercase tracking-widest ml-1"
                          >Ghi chú</label
                        >
                        <div class="relative">
                          <input
                            v-model="item.note"
                            class="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-xl px-4 py-2.5 text-[11px] text-indigo-400 font-black outline-none focus:border-indigo-500/50"
                            placeholder="Nhập hướng dẫn cho mục này..."
                          />
                          <div
                            v-if="getNoteIndex(Number(rIdx), iIdx as number)"
                            class="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 text-white rounded-full text-[8px] flex items-center justify-center font-bold shadow-lg"
                          >
                            ({{ getNoteIndex(Number(rIdx), iIdx as number) }})
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="flex items-center justify-between pt-3 border-t border-white/5"
                    >
                      <div class="flex gap-2">
                        <button
                          @click="item.bold = !item.bold"
                          :class="
                            item.bold
                              ? 'bg-teal-500 text-white'
                              : 'bg-white/5 text-gray-500'
                          "
                          class="p-2 rounded-lg transition-all"
                        >
                          <BoldIcon class="w-3.5 h-3.5" />
                        </button>
                        <button
                          @click="item.italic = !item.italic"
                          :class="
                            item.italic
                              ? 'bg-teal-500 text-white'
                              : 'bg-white/5 text-gray-500'
                          "
                          class="p-2 rounded-lg transition-all"
                        >
                          <ItalicIcon class="w-3.5 h-3.5" />
                        </button>
                        <button
                          @click="item.underline = !item.underline"
                          :class="
                            item.underline
                              ? 'bg-teal-500 text-white'
                              : 'bg-white/5 text-gray-500'
                          "
                          class="p-2 rounded-lg transition-all"
                        >
                          <UnderlineIcon class="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div
                        class="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5"
                      >
                        <button
                          v-for="align in [0, 1, 2, 3]"
                          :key="align"
                          @click="item.textAlign = align"
                          :class="
                            item.textAlign === align
                              ? 'bg-teal-500 text-white'
                              : 'text-gray-500 hover:text-white'
                          "
                          class="p-1.5 rounded-lg transition-all"
                        >
                          <component
                            :is="getAlignIconForVal(align)"
                            class="w-3 h-3"
                          />
                        </button>
                      </div>

                      <div class="flex items-center gap-4">
                        <div
                          class="flex items-center gap-2 bg-white/5 p-1 px-3 rounded-xl border border-white/5"
                        >
                          <span
                            class="text-[8px] font-bold text-gray-400 uppercase tracking-tighter"
                            >Dòng</span
                          >
                          <input
                            type="number"
                            step="0.1"
                            v-model="item.lineHeight"
                            class="w-10 bg-transparent border-none text-[10px] text-teal-400 font-bold outline-none"
                            placeholder="1.5"
                          />
                        </div>
                        <div
                          class="flex p-1 bg-white/5 rounded-xl border border-white/5"
                        >
                          <button
                            @click="item.listType = 'none'"
                            :class="
                              item.listType === 'none' || !item.listType
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-500 hover:text-white'
                            "
                            class="p-1.5 rounded-lg transition-all text-[8px] font-bold px-2"
                          >
                            NONE
                          </button>
                          <button
                            @click="item.listType = 'bullet'"
                            :class="
                              item.listType === 'bullet'
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-500 hover:text-white'
                            "
                            class="p-1.5 rounded-lg transition-all"
                          >
                            <ListIcon class="w-3 h-3" />
                          </button>
                          <button
                            @click="item.listType = 'number'"
                            :class="
                              item.listType === 'number'
                                ? 'bg-teal-500 text-white'
                                : 'text-gray-500 hover:text-white'
                            "
                            class="p-1.5 rounded-lg transition-all"
                          >
                            <ListOrderedIcon class="w-3 h-3" />
                          </button>
                        </div>
                        <div
                          class="flex items-center gap-2 bg-white/5 p-1 px-3 rounded-xl border border-white/5"
                        >
                          <span class="text-[8px] font-bold text-gray-500"
                            >CHỮ</span
                          >
                          <input
                            type="color"
                            v-model="item.background"
                            class="w-5 h-5 bg-transparent border-none cursor-pointer p-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- Row Height Resizer Handle -->
              <div
                v-if="rowObj.isTable"
                class="absolute -bottom-1.5 left-0 right-0 h-3 hover:bg-teal-500/20 cursor-row-resize z-10 transition-colors group/row-resizer"
                @mousedown="startRowResizing($event, Number(rIdx))"
              >
                <div
                  class="absolute inset-x-0 top-1/2 -mt-[0.5px] h-[1px] bg-white/5 group-hover/row-resizer:bg-teal-400 opacity-0 group-hover/row-resizer:opacity-100"
                ></div>
              </div>
            </div>
            <div
              v-if="rowObj.isTable && rowObj.minHeight"
              class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 pointer-events-none"
            >
              H: {{ rowObj.minHeight }}px
            </div>
          </div>

          <!-- Table Selector Overlay -->
          <div
            v-if="showTableSelector"
            class="absolute inset-0 z-50 flex items-center justify-center p-12 bg-black/40 backdrop-blur-sm"
          >
            <div
              class="bg-[#11111a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300"
            >
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-teal-500/10 rounded-2xl">
                    <TableIcon class="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h5
                      class="text-lg font-black text-white uppercase tracking-tighter"
                    >
                      Table Creator
                    </h5>
                    <p class="text-xs text-gray-500">
                      {{ hoveredCols }} Columns × {{ hoveredRows }} Rows
                    </p>
                  </div>
                </div>
                <button
                  @click="showTableSelector = false"
                  class="p-2 hover:bg-white/5 rounded-xl text-gray-400"
                >
                  <XIcon class="w-5 h-5" />
                </button>
              </div>

              <div
                class="p-4 bg-black/40 border border-white/5 rounded-3xl"
                @mouseleave="handleTableHover(0, 0)"
              >
                <div class="grid grid-cols-10 gap-1.5">
                  <div v-for="r in 10" :key="'r' + r" class="contents">
                    <div
                      v-for="c in 10"
                      :key="'c' + c"
                      @mouseover="handleTableHover(r, c)"
                      @click="addTable(c, r)"
                      class="w-8 h-8 rounded-lg border-2 transition-all cursor-pointer"
                      :class="[
                        c <= hoveredCols && r <= hoveredRows
                          ? 'bg-teal-500/30 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                          : 'bg-white/5 border-white/10 border-dashed',
                      ]"
                    ></div>
                  </div>
                </div>
              </div>

              <p
                class="mt-6 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest"
              >
                Kéo chuột để chọn kích thước bảng
              </p>
            </div>
          </div>

          <!-- Quick Import Overlay -->
          <div
            v-if="showQuickImport"
            class="absolute inset-0 z-50 flex items-center justify-center p-12 bg-black/40 backdrop-blur-sm"
          >
            <div
              class="w-full max-w-2xl bg-[#11111a] border border-teal-500/30 rounded-[3rem] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300"
            >
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-teal-500/10 rounded-2xl">
                    <span class="text-2xl">✨</span>
                  </div>
                  <div>
                    <h5
                      class="text-lg font-black text-white uppercase tracking-tighter"
                    >
                      Magic Quick Import
                    </h5>
                    <p class="text-xs text-gray-500">
                      Tự động tạo hàng loạt từ văn bản dán vào.
                    </p>
                  </div>
                </div>
                <button
                  @click="showQuickImport = false"
                  class="p-3 hover:bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all"
                >
                  <XIcon class="w-6 h-6" />
                </button>
              </div>

              <div class="space-y-6">
                <div class="p-6 bg-black/40 border border-white/5 rounded-3xl">
                  <p class="text-[10px] text-gray-400 leading-relaxed">
                    <span class="text-teal-400 font-bold">Mẹo:</span> Mỗi dòng
                    sẽ trở thành một hàng mới. Nếu dòng có dấu
                    <span
                      class="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono"
                      >:</span
                    >
                    hệ thống sẽ tự tạo
                    <span class="text-white font-bold">Ô điền</span>.
                  </p>
                </div>

                <textarea
                  v-model="quickImportText"
                  rows="8"
                  class="w-full bg-black/60 border border-white/10 rounded-[2rem] p-8 text-sm text-white outline-none focus:border-teal-500 transition-all font-medium resize-none shadow-inner"
                  placeholder="Họ và tên:&#10;Địa chỉ:&#10;Nội dung yêu cầu..."
                ></textarea>

                <div class="flex gap-4">
                  <button
                    @click="showQuickImport = false"
                    class="flex-1 px-8 py-5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-center"
                  >
                    Bỏ qua
                  </button>
                  <button
                    @click="handleQuickImport"
                    class="flex-[2] px-8 py-5 bg-teal-500 hover:bg-teal-400 text-[#050508] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-500/20 text-center"
                  >
                    Bắt đầu kiến tạo ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Import Overlay (Moved logic above but keep overlay here or move too) -->
          <!-- It's better to keep overlays in body but trigger from footer -->

          <!-- JSON View Overlay -->
          <div
            v-if="showJsonView"
            class="absolute inset-0 z-50 flex items-center justify-center p-12 bg-black/40 backdrop-blur-sm"
          >
            <div
              class="w-full max-w-4xl bg-[#11111a] border border-pink-500/30 rounded-[3rem] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300 flex flex-col h-[80vh]"
            >
              <div class="flex items-center justify-between mb-8 flex-shrink-0">
                <div class="flex items-center gap-4">
                  <div class="p-4 bg-pink-500/10 rounded-2xl">
                    <CodeIcon class="w-8 h-8 text-pink-400" />
                  </div>
                  <div>
                    <h5
                      class="text-2xl font-black text-white uppercase tracking-tighter"
                    >
                      Raw Blueprint Data
                    </h5>
                    <p class="text-sm text-gray-500">
                      Xem, chỉnh sửa hoặc dán JSON của bạn vào đây.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <button
                    @click="copyJson"
                    class="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    <CopyIcon class="w-5 h-5" /> Copy
                  </button>
                  <button
                    @click="showJsonView = false"
                    class="p-4 hover:bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all"
                  >
                    <XIcon class="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div
                class="flex-1 min-h-0 bg-black/60 rounded-[2rem] border border-white/5 p-6 overflow-hidden flex flex-col shadow-inner"
              >
                <textarea
                  v-model="jsonText"
                  class="flex-1 w-full bg-transparent border-none outline-none text-[11px] font-mono text-pink-300 resize-none custom-scrollbar leading-relaxed"
                  spellcheck="false"
                  placeholder="Paste your JSON blueprint here..."
                ></textarea>
              </div>

              <div class="mt-8 flex gap-4 flex-shrink-0">
                <button
                  @click="showJsonView = false"
                  class="flex-1 px-8 py-5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  Đóng lại
                </button>
                <button
                  @click="handleImportJson"
                  class="flex-[2] px-8 py-5 bg-pink-500 hover:bg-pink-400 text-[#050508] rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-pink-500/20"
                >
                  Phục hồi cấu trúc ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex-shrink-0 border-t border-white/5 bg-white/[0.02] flex flex-col"
      >
        <!-- Toolbar Row -->
        <div
          class="p-4 border-b border-white/5 bg-black/20 flex items-center justify-center gap-3"
        >
          <button
            @click="addRow"
            class="group flex items-center gap-3 px-6 py-3 bg-teal-500/10 hover:bg-teal-500 border border-teal-500/20 rounded-2xl transition-all shadow-lg"
          >
            <LayoutIcon class="w-5 h-5 text-teal-400 group-hover:text-white" />
            <span
              class="text-[9px] font-black text-teal-400 group-hover:text-white uppercase tracking-widest"
              >TỰ TẠO</span
            >
          </button>

          <button
            @click="showTableSelector = true"
            class="group flex items-center gap-3 px-6 py-3 bg-teal-500/10 hover:bg-teal-500 border border-teal-500/20 rounded-2xl transition-all shadow-lg"
            :class="{
              'ring-2 ring-teal-500 bg-teal-500/20': showTableSelector,
            }"
          >
            <TableIcon class="w-5 h-5 text-teal-400 group-hover:text-white" />
            <span
              class="text-[9px] font-black text-teal-400 group-hover:text-white uppercase tracking-widest"
              >BẢNG</span
            >
          </button>

          <button
            @click="showQuickImport = !showQuickImport"
            class="group flex items-center gap-3 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 rounded-2xl transition-all shadow-lg"
            :class="{
              'ring-2 ring-indigo-500 bg-indigo-500/20': showQuickImport,
            }"
          >
            <TypeIcon class="w-5 h-5 text-indigo-400 group-hover:text-white" />
            <span
              class="text-[9px] font-black text-indigo-400 group-hover:text-white uppercase tracking-widest"
              >NHẬP NHANH</span
            >
          </button>

          <button
            @click="showSidebar = !showSidebar"
            class="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all shadow-lg"
            :class="{
              'ring-2 ring-teal-500/50 bg-teal-500/5 border-teal-500/30':
                showSidebar,
            }"
          >
            <EditIcon
              class="w-5 h-5 text-gray-400 group-hover:text-teal-400"
              :class="{ 'text-teal-400': showSidebar }"
            />
            <span
              class="text-[9px] font-black text-gray-400 group-hover:text-teal-400 uppercase tracking-widest"
              >HỆ THỐNG</span
            >
          </button>

          <button
            @click="handleOpenJsonView"
            class="group flex items-center gap-3 px-6 py-3 bg-pink-500/10 hover:bg-pink-500 border border-pink-500/20 rounded-2xl transition-all shadow-lg"
          >
            <CodeIcon class="w-5 h-5 text-pink-400 group-hover:text-white" />
            <span
              class="text-[9px] font-black text-pink-400 group-hover:text-white uppercase tracking-widest"
              >JSON Blueprints</span
            >
          </button>
        </div>

        <!-- Action Row -->
        <div class="px-8 py-6 flex items-center justify-between">
          <div class="flex items-center gap-3 opacity-60">
            <div class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
            <span
              class="text-[9px] font-black text-gray-400 uppercase tracking-widest"
              >Architect Engine v2.1 Active</span
            >
          </div>
          <div class="flex gap-4">
            <button
              @click="emit('close')"
              class="px-8 py-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl text-[10px] font-black transition-all uppercase tracking-widest"
            >
              Hủy bỏ
            </button>
            <button
              @click="onGenerate"
              class="px-10 py-3 bg-teal-500 hover:bg-teal-400 text-[#050508] rounded-xl text-[10px] font-black transition-all shadow-lg shadow-teal-500/20 uppercase tracking-widest"
            >
              Cập nhật cấu trúc
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
