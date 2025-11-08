export default function Teste() {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-foreground mb-4">Teste de Design</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Teste cores do tema */}
        <div className="p-4 bg-sidebar-bg text-white rounded">sidebar-bg</div>
        <div className="p-4 bg-sidebar-active text-white rounded">sidebar-active</div>
        <div className="p-4 bg-accent text-white rounded">accent</div>
        
        {/* Teste cards */}
        <div className="p-4 bg-card text-card-foreground rounded-lg border border-card-border">card</div>
        <div className="p-4 glass-card text-foreground rounded-lg">glass-card</div>
        
        {/* Teste cores semânticas */}
        <div className="p-4 bg-success text-white rounded">success</div>
        <div className="p-4 bg-error text-white rounded">error</div>
      </div>
    </div>
  )
}