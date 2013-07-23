            precision mediump float;
            varying vec3 fPos;
            varying vec3 rDir;
            varying vec3 rOrigin;

            #define SCENE_SIZE = 2
            #define MAX_DIST = 1000000.0

            const struct sphere
            {
                vec3 pos;
                float r;
                vec3 color;
            } scene[SCENE_SIZE];

            float raySphere(vec3 o, vec3 d, vec3 p, float r)
            {
                vec3 q = p - o;
                float c = length(q);
                float v = dot(q, d);
                float t = r * r - (c*c - v*v);

                if(t < 0.0)
                    return MAX_DIST + 1.0;

                float dist = v - sqrt(t);
                return dist;
            }

            vec3 traceScene(vec3 o, vec3 d)
            {
                vec3 result = vec3(0.0);
                float minDist = MAX_DIST;

                for(int i = 0;i < SCENE_SIZE;i++)
                {
                    float rayDist = raySphere(o, d, scene[i].pos, scene[i].r);
                    if(rayDist < minDist)
                    {
                        minDist = rayDist;
                        result = scene[i].color;
                    }
                }

                return result;
            }

            void main() 
            {
                // Set up scene
                scene[0].pos = vec3(0.5, 0.0, 2.0);
                scene[0].r = 0.5;
                scene[0].color = vec3(1.0, 0.0, 0.0);

                scene[1].pos = vec3(-0.5, 0.0, 2.0);
                scene[1].r = 0.5;
                scene[1].color = vec3(0.0, 0.0, 1.0);

                vec3 nRayDir = normalize(rDir);
                gl_FragColor = vec4(traceScene(rOrigin, nRayDir), 1.0);
            }