import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle, XCircle, AlertTriangle, Shield, Image, FileText } from 'lucide-react';

type Result = { label: string; pass: boolean; detail: string };

export function DocumentValidatorPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [checking, setChecking] = useState(false);

  const validate = useCallback((f: File) => {
    setFile(f);
    setChecking(true);
    setResults([]);

    const checks: Result[] = [];

    // File type check
    const isImage = f.type.startsWith('image/');
    const isPDF = f.type === 'application/pdf';
    checks.push({
      label: 'File type',
      pass: isImage || isPDF,
      detail: isImage ? `Image (${f.type.split('/')[1].toUpperCase()})` : isPDF ? 'PDF document' : `Unsupported: ${f.type || 'unknown'}`,
    });

    // File size check (< 1MB)
    const sizeMB = f.size / (1024 * 1024);
    checks.push({
      label: 'File size',
      pass: sizeMB <= 1,
      detail: `${sizeMB.toFixed(2)} MB ${sizeMB > 1 ? '(must be under 1 MB)' : '(\u2713 under 1 MB)'}`,
    });

    if (isImage) {
      const img = new window.Image();
      const url = URL.createObjectURL(f);
      setPreview(url);

      img.onload = () => {
        // Dimension check — passport photo at 300dpi: ~413x531px
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const ratio = h / w;
        const goodRatio = ratio >= 1.2 && ratio <= 1.5; // 3.5x4.5 = 1.28 ratio
        checks.push({
          label: 'Dimensions',
          pass: w >= 300 && h >= 300,
          detail: `${w} \u00d7 ${h} px ${w < 300 || h < 300 ? '(min 300\u00d7300 recommended)' : '(\u2713 sufficient resolution)'}`,
        });
        checks.push({
          label: 'Aspect ratio (passport photo)',
          pass: goodRatio,
          detail: `${ratio.toFixed(2)} ${goodRatio ? '(\u2713 close to 3.5\u00d74.5 cm)' : '(expected ~1.28 for passport photo)'}`,
        });

        // Background color check via canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(img, 0, 0);

          // Sample corners for white background
          const corners = [
            ctx.getImageData(5, 5, 1, 1).data,
            ctx.getImageData(w - 5, 5, 1, 1).data,
            ctx.getImageData(5, h - 5, 1, 1).data,
            ctx.getImageData(w - 5, h - 5, 1, 1).data,
          ];
          const whiteCorners = corners.filter(d => d[0] > 200 && d[1] > 200 && d[2] > 200).length;
          checks.push({
            label: 'White background',
            pass: whiteCorners >= 3,
            detail: whiteCorners >= 3
              ? `${whiteCorners}/4 corners are white (\u2713 looks good)`
              : `Only ${whiteCorners}/4 corners appear white. Passport photos require a plain white background.`,
          });
        }

        setResults([...checks]);
        setChecking(false);
      };
      img.src = url;
    } else if (isPDF) {
      setPreview(null);
      checks.push({ label: 'PDF validation', pass: true, detail: 'PDF detected. Page count and content validation require a full reader (not available in this prototype).' });
      setResults([...checks]);
      setChecking(false);
    } else {
      setPreview(null);
      setResults([...checks]);
      setChecking(false);
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) validate(f);
  };

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validate(f);
  };

  const passCount = results.filter(r => r.pass).length;
  const failCount = results.filter(r => !r.pass).length;

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Document Validator
      </h1>
      <p className="text-base mb-4" style={{ color: 'var(--color-graphite-light)' }}>
        Check if your passport photo or document meets the requirements \u2014 before you reach the counter.
      </p>
      <div className="flex items-center gap-2 mb-10 text-xs font-semibold" style={{ color: 'var(--color-success)' }}>
        <Shield className="w-4 h-4" /> Your file stays on your device. Nothing is uploaded anywhere.
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className="card p-12 text-center cursor-pointer border-dashed hover:border-solid transition-all"
        style={{ borderWidth: '2px', borderColor: 'var(--color-indigo)' }}
      >
        <Upload className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--color-indigo)' }} />
        <p className="font-semibold mb-1" style={{ color: 'var(--color-graphite)' }}>
          Drop your passport photo or document here
        </p>
        <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
          or click to browse \u00b7 JPG, PNG, or PDF \u00b7 Max 1 MB
        </p>
        <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handlePick} className="hidden" />
      </div>

      {/* Results */}
      {checking && (
        <div className="text-center py-8 animate-pulse">
          <p style={{ color: 'var(--color-graphite-light)' }}>Analyzing...</p>
        </div>
      )}

      {results.length > 0 && !checking && (
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-6">
            {file && (
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-graphite-light)' }}>
                {file.type.startsWith('image/') ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                {file.name}
              </div>
            )}
            <div className="flex gap-3 ml-auto">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: 'var(--color-success)' }}>
                {passCount} passed
              </span>
              {failCount > 0 && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--color-error)' }}>
                  {failCount} failed
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Preview */}
            {preview && (
              <div className="card p-4 flex items-center justify-center">
                <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
              </div>
            )}

            {/* Check results */}
            <div className="space-y-3">
              {results.map((r, i) => (
                <div key={i} className="card p-4 flex items-start gap-3">
                  {r.pass ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                  ) : (
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-error)' }} />
                  )}
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--color-graphite)' }}>{r.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-graphite-light)' }}>{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setFile(null); setPreview(null); setResults([]); }} className="btn btn-ghost mt-6">
            Check another file
          </button>
        </div>
      )}
    </div>
  );
}
