import * as React from "react"
import { FolderIcon, FileIcon, ClockIcon } from "lucide-react"
import { Button } from "./components/ui/button"

interface File {
  name: string
  lastOpened: string
  type: "document" | "presentation" | "spreadsheet"
}

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const files: File[] = [
    {
      name: "Annual Report 2023",
      lastOpened: "2 hours ago",
      type: "document",
    },
    {
      name: "Q4 Presentation",
      lastOpened: "Yesterday",
      type: "presentation",
    },
    {
      name: "Budget Overview",
      lastOpened: "2 days ago",
      type: "spreadsheet",
    },
    {
      name: "Meeting Notes",
      lastOpened: "1 week ago",
      type: "document",
    },
    {
      name: "Project Timeline",
      lastOpened: "2 weeks ago",
      type: "spreadsheet",
    },
  ]

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setIsOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F6F6]">
      <div 
        className="relative"
        ref={dropdownRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Button
          variant="outline"
          className="gap-2 w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-2">
            <FolderIcon className="h-4 w-4" />
            {selectedFile ? selectedFile.name : "Documents"}
          </span>
        </Button>
        {isOpen && (
          <>
            {/* Invisible connector div to maintain hover */}
            <div className="absolute left-0 w-full h-2 -bottom-2" />
            <div 
              className="absolute left-0 z-10 w-80 rounded-md bg-popover p-1 shadow-md"
              style={{ top: "calc(100% + 8px)" }}
            >
              <div className="grid gap-1">
                {files.map((file, index) => (
                  <FileItem 
                    key={index} 
                    file={file} 
                    isSelected={selectedFile?.name === file.name}
                    onSelect={handleFileSelect}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function FileItem({ file, isSelected, onSelect }: { file: File; isSelected: boolean; onSelect: (file: File) => void }) {
  return (
    <Button 
      variant="ghost" 
      className={`w-full justify-start gap-2 px-2 py-1 text-left ${
        isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
      }`}
      onClick={() => onSelect(file)}
    >
      <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-sm font-medium">{file.name}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ClockIcon className="h-3 w-3" />
          {file.lastOpened}
        </span>
      </div>
    </Button>
  )
}