"""Generate bundled GLB from MakeHuman's CC0 anatomical mesh. Python stdlib only.
No network needed. Keep the head/neck and hands visible; clothes cover other areas.
"""
import json,math,struct
from pathlib import Path
root=Path(__file__).resolve().parents[1]
verts=[]; faces=[]; group=''
for line in (root/'scripts/source/makehuman-base.obj').read_text().splitlines():
 p=line.split()
 if not p: continue
 if p[0]=='v': verts.append(tuple(map(float,p[1:4])))
 elif p[0]=='g': group=p[1]
 elif p[0]=='f' and group=='body':
  ids=[int(x.split('/')[0])-1 for x in p[1:]]
  for j in range(1,len(ids)-1): faces.append([ids[0],ids[j],ids[j+1]])
def posed(v):
 x,y,z=v
 if abs(x)>1.9 and y>0.8:
  s=1 if x>0 else -1
  w=min(1,max(0,(abs(x)-1.9)/0.6));t=-math.radians(23)*w
  dx=abs(x)-1.67;dy=y-5.24
  x=s*(1.67+dx*math.cos(t)-dy*math.sin(t));y=5.24+dx*math.sin(t)+dy*math.cos(t)
  z=z*(1-.70*w)
 return [x*.1,(y+8.17)*.1+.02,z*.1]
v=[posed(a) for a in verts]
keep=[f for f in faces if all(v[i][1]>1.405 or (abs(v[i][0])>.26 and .72<v[i][1]<1.01) for i in f)]
used=sorted(set(i for f in keep for i in f));ids={i:j for j,i in enumerate(used)}
p=[v[i] for i in used];tri=[[ids[i] for i in f] for f in keep];norm=[[0.,0.,0.] for _ in p]
for a,b,c in tri:
 u=[p[b][j]-p[a][j] for j in range(3)];w=[p[c][j]-p[a][j] for j in range(3)]
 n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]]
 for i in [a,b,c]:
  for j in range(3):norm[i][j]+=n[j]
for n in norm:
 d=math.sqrt(sum(x*x for x in n)) or 1
 for j in range(3):n[j]/=d
colors=[]
for x,y,z in p:
 # Scalp/back hair and fine lip tint; use a distinct material in viewer for skin.
 if y>1.63 or (y>1.50 and z<-.015):colors.append([.07,.045,.03])
 elif 1.487<y<1.501 and z>.138 and abs(x)<.03:colors.append([.82,.47,.42])
 elif 1.577<y<1.585 and .014<abs(x)<.052 and z>.12:colors.append([.20,.12,.08])
 else:colors.append([1.,1.,1.])
blob=bytearray();views=[];accessors=[]
def accessor(values,fmt,typ,component,minmax=False):
 while len(blob)%4:blob.append(0)
 start=len(blob);flat=[x for row in values for x in row];blob.extend(struct.pack('<'+fmt*len(flat),*flat))
 idx=len(views);views.append({'buffer':0,'byteOffset':start,'byteLength':len(blob)-start})
 a={'bufferView':idx,'componentType':component,'count':len(values),'type':typ}
 if minmax:a.update(min=[min(r[j] for r in values) for j in range(3)],max=[max(r[j] for r in values) for j in range(3)])
 accessors.append(a);return len(accessors)-1
pos=accessor(p,'f','VEC3',5126,True);normal=accessor(norm,'f','VEC3',5126);color=accessor(colors,'f','VEC3',5126);indices=accessor([[i] for f in tri for i in f],'I','SCALAR',5125)
gltf={'asset':{'version':'2.0','generator':'Viet Phuc Remix; MakeHuman CC0 base'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':'HumanVisibleSkin'}],'meshes':[{'primitives':[{'attributes':{'POSITION':pos,'NORMAL':normal,'COLOR_0':color},'indices':indices,'material':0}]}],'materials':[{'name':'skin','doubleSided':True,'pbrMetallicRoughness':{'baseColorFactor':[1,1,1,1],'metallicFactor':0,'roughnessFactor':.67}}],'buffers':[{'byteLength':len(blob)}],'bufferViews':views,'accessors':accessors}
j=json.dumps(gltf,separators=(',',':')).encode()
while len(j)%4:j+=b' '
while len(blob)%4:blob.append(0)
out=struct.pack('<III',0x46546c67,2,12+8+len(j)+8+len(blob))+struct.pack('<II',len(j),0x4e4f534a)+j+struct.pack('<II',len(blob),0x004e4942)+blob
(root/'public/models/avatar-base.glb').write_bytes(out)
print('Generated',len(p),'vertices,',len(tri),'triangles;',len(out),'bytes')
